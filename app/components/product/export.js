import xlsx from 'xlsx';
import { get } from 'lodash';
import { remote } from 'electron';
import moment from 'moment';
import { notification } from 'antd';

const { dialog } = remote;
const productTypes = ['STANDARD', 'COMBO', 'SERVICE'];

export const exportAsXlsx = ({ columns, data, categories, manufacturers }) => {
  const sheetData = data.map((dataRow) => {
    return columns.map(({ field }) => {
      if (field == 'Type') {
        return productTypes[get(dataRow, field)];
      }
      else if (field == 'CreatedAt') {
        return moment(dataRow[field]).format('LL');
      }
      else if (field == 'Category.Name') {
        const category = categories.find(({ _id }) => _id == dataRow.CategoryId);
        if (!category) return null;
        return category.Name;
      }
      else if (field == 'Manufacturer.Name') {
        const manufacturer = manufacturers.find(({ _id }) => _id == dataRow.ManufacturerId);
        if (!manufacturer) return null;
        return manufacturer.Name;
      }

      return get(dataRow, field)
    });
  });

  const head = columns.map(({ headerName }) => headerName);
  sheetData.unshift(head);

  const worksheet = xlsx.utils.aoa_to_sheet(sheetData);

  const worksheetCols = columns.map(({ width }) => ({ wpx: width }));
  worksheet['!cols'] = worksheetCols;

  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');

  dialog.showSaveDialog({
    title: 'Export Products',
    filters: [{ name: 'Excel files', extensions: ['xlsx'] }]
  })
    .then(({ filePath }) => {
      xlsx.writeFile(workbook, filePath);

      notification.success({
        message: 'EXPORT PRODUCTS',
        description: `${data.length} Product(s) has been exported successfully.`,
        placement: 'bottomRight'
      });
    });
}
