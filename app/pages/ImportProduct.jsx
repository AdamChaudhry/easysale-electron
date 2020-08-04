import React, { Component } from 'react';
import { PageHeader, Alert, Button, Upload, Table, Divider } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { round } from 'lodash';
import xlsx from 'xlsx';
import shortid from 'shortid';

import * as actions from '../actions/products';
import { exportSampleAsXlsx } from '../components/importProduct/import';

const { Dragger } = Upload;
const nf = Intl.NumberFormat();
const productTypes = ['STANDARD', 'COMBO', 'SERVICE'];

class ImportProductPage extends Component {
  state = {
    file: '',
    categories: [],
    manufacturers: [],
    invalidProducts: [],
    dbProducts: []
  }

  componentDidMount() {
    const { getCategory, getManufacturer } = this.props
    Promise.all([
      getCategory(),
      getManufacturer()
    ])
      .then(([
        { categories },
        { manufacturers }
      ]) => this.setState({ categories, manufacturers }));
  }

  handleOnChangeFile = ({ file }) => {
    const { originFileObj } = file || {};
    this.setState({ file: originFileObj });
  }

  handleDeleteFile = () => {
    this.setState({ file: '' });
  }

  handleImport = () => {
    const { file } = this.state;

    const reader = new FileReader();

    reader.onload = () => {
      const workbook = xlsx.read(reader.result, { type: 'binary' });
      var firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const products = xlsx.utils.sheet_to_json(firstWorksheet, { header: 1 });

      this.populateXlsxToProducts({ products });
    };

    reader.onerror = (error) => console.log('Error: ', error);
    reader.readAsBinaryString(file);
  }

  populateXlsxToProducts = ({ products }) => {
    const { bulkInsertManufacturer, bulkInsertCategory, getExportProducts, auth, bulkInsertProducts } = this.props;
    const { categories, manufacturers } = this.state;

    const { user } = auth || {};

    const codes = [];
    const names = [];
    const newCategories = [];
    const newManufacturers = [];

    products.shift();
    const xlsxProducts = products.map(([Code, Name, Description, Category, Manufacturer, Type, MinQty, Stock, Cost, Price]) => {
      if (Code) codes.push(Code.toString());
      names.push(Name);

      if (Category && !categories.some((cat) => cat.Name === Category ) && !newCategories.some((cat) => cat.Name === Category)) {
        newCategories.push({ Name: Category });
      }

      if (Manufacturer && !manufacturers.some((mfg) => mfg.Name === Manufacturer) && !newManufacturers.some((mfg) => mfg.Name === Manufacturer)) {
        newManufacturers.push({ Name: Manufacturer });
      }

      return { Code, Name, Description, Category, Manufacturer, Type, MinQty, Stock, Cost, Price };
    });

    Promise.all([
      bulkInsertCategory({ newCategories }),
      bulkInsertManufacturer({ newManufacturers }),
      getExportProducts({ codes }),
      getExportProducts({ names })
    ])
      .then(([
        { categories },
        { manufacturers },
        { products: savedCodeProducts },
        { products: savedNameProducts }
      ]) => {
        const invalidProducts = [];
        const dbProducts = [];

        xlsxProducts.forEach(({ Code, Name, Description, Category, Manufacturer, Type, MinQty, Stock, Cost, Price }, index) => {
          const error = [];

          if (Code) {
            if (xlsxProducts.filter((product) => product.Code == Code).length > 1) {
              error.push('Duplicate Code in excel file');
            }

            if (savedCodeProducts.find((product) => product.Code == Code)) {
              error.push('Same code already exist');
            }
          }


          if (!Name) {
            error.push('Name is required');
          }

          if (Name) {
            if (xlsxProducts.filter((product) => product.Name === Name && product.Manufacturer === Manufacturer).length > 1) {
              error.push(`Duplicate Product with ${Manufacturer} in excel file`);
            }

            const manufacturer = manufacturers.find((mfg) => mfg.Name === Manufacturer);
            if (manufacturer) {
              if (savedNameProducts.find((product) => product.Name === Name && product.ManufacturerId === manufacturer._id)) {
                error.push(`Product with ${Manufacturer} already exist`);
              }
            }
          }

          if (!Category) {
            error.push('Category is required');
          }


          if (MinQty && !/^\+?\d+$/.test(MinQty)) {
            error.push('Invalid MinQty');
          }

          if (Stock && !/^\+?\d+$/.test(Stock)) {
            error.push('Invalid Stock');
          }

          if (Cost && !/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(Cost)) {
            error.push('Invalid Cost');
          }

          if (!Price) {
            error.push('Price is required');
          }

          if (Price && !/^(?:[1-9]\d*|0)?(?:\.\d+)?$/.test(Price)) {
            error.push('Invalid Price')
          }

          if (error && error.length) {
            if (!invalidProducts.some((ip) => ip.Name === Name && ip.Manufacturer === Manufacturer)) {
              invalidProducts.push({
                Row: index,
                Code,
                Name,
                Category,
                Manufacturer,
                Stock,
                Cost,
                Price,
                error
              });
            }
          }
          else {
            const category = categories.find((cat) => cat.Name === Category);
            const manufacturer = manufacturers.find((mfg) => mfg.Name === Manufacturer);
            dbProducts.push({
              Code: Code || `prod-${shortid.generate()}`,
              Name,
              Description: Description || null,
              CategoryId: category ? category._id : null,
              ManufacturerId: manufacturer ? manufacturer._id : null,
              Type: productTypes.indexOf(Type) == -1 ? 0 : productTypes.indexOf(Type),
              MinQty: MinQty || 0,
              Stock: {
                Qty: Stock || 0
              },
              Cost: Cost || null,
              Price,
              Addedby: user._id
            });
          }
        });

        this.setState({
          categories,
          manufacturers,
          invalidProducts,
          dbProducts
        });

        if (!invalidProducts || !invalidProducts.length) {
          bulkInsertProducts({ newProducts: dbProducts });
        }
      });
  }

  column = [
    {
      title: 'Excel Row',
      dataIndex: 'Row',
      width: 100,
      render: (value) => (value += 2)
    },
    {
      title: 'Code',
      dataIndex: 'Code',
      width: 100
    },
    {
      title: 'Name',
      dataIndex: 'Name'
    },
    {
      title: 'Category',
      dataIndex: 'Category'
    },
    {
      title: 'Manufacturer',
      dataIndex: 'Manufacturer'
    },
    {
      title: 'Stock',
      dataIndex: 'Stock',
      width: 70
    },
    {
      title: 'Cost',
      dataIndex: 'Cost',
      width: 70
    },
    {
      title: 'Price',
      dataIndex: 'Price',
      width: 70
    },
    {
      title: 'Errors',
      dataIndex: 'error',
      width: 250,
      render: (text, { error }) => {
        return (
          <ul>
            {error.map((err) => <li>{err}</li>)}
          </ul>
        )
      }
    }
  ]

  render() {
    const { file, invalidProducts } = this.state;
    return (
      <div style={{ height: '100%' }}>
        <PageHeader
          style={{
            height: '53px',
            marginBottom: '10px',
            padding: '7px'
          }}
          title="Import Product"
        />
        <Alert
          type='info'
          message={
            <div>
              <h3>The first line in downloaded csv file should remain as it is. Please do not change the order of columns.</h3>
              <p>The correct column order is (Code, Name, Description, Category, Manufacturer, Type, MinQty, Stock, Cost, Price) and you must follow this.</p>
              <Button
                onClick={exportSampleAsXlsx}
                type='ghost'>
                Get Sample File
              </Button>
            </div>
          }
        />
        <div style={{ marginTop: '10px' }}>
          <Dragger
            showUploadList={false}
            onChange={this.handleOnChangeFile}
            beforeUpload={false}>
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single</p>
          </Dragger>
        </div>
        <div style={{ margin: '10px 0px 0px 0px', display: 'flex' }}>
          {file
            && (
              <div style={{ display: 'flex' }}>
                <strong>{file.name}</strong>
                <div style={{ margin: '0px 10px' }}>{nf.format(round(file.size / 1000).toFixed(0))}kb</div>
                <Button
                  style={{ marginLeft: '20px' }}
                  type='ghost'
                  size='small'
                  onClick={this.handleDeleteFile}
                  icon={<DeleteOutlined />}
                />
              </div>
            )}
          <div style={{ marginLeft: 'auto' }}>
            <Button
              disabled={!file || (invalidProducts && invalidProducts.length)}
              onClick={this.handleImport}
              type='primary'>
              Import
            </Button>
          </div>
        </div>
        {(invalidProducts && invalidProducts.length > 0)
          && (
            <div>
              <h2>Validation Summary</h2>
              <Table
                style={{ marginTop: '10px' }}
                columns={this.column}
                dataSource={invalidProducts}
                pagination={false}
                size='small'
                scroll={{ y: 500 }}
              />
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ products, auth }) => ({ ...products, auth });

export default connect(mapStateToProps, actions)(ImportProductPage);
