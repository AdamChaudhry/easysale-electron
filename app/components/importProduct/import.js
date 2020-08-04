import xlsx from 'xlsx';
import { remote } from 'electron';
import { notification } from 'antd';

const { dialog } = remote;
const head = ['Code', 'Name', 'Description', 'Category', 'Manufacturer', 'Type', 'MinQty', 'Stock', 'Cost', 'Price'];

export const header = head;

export const exportSampleAsXlsx = () => {
  const worksheet = xlsx.utils.aoa_to_sheet([head]);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');

  dialog.showSaveDialog({
    title: 'Sample Products',
    filters: [{ name: 'Excel files', extensions: ['xlsx'] }]
  })
    .then(({ filePath }) => {
      xlsx.writeFile(workbook, filePath);

      notification.success({
        message: 'EXPORT PRODUCTS',
        description: 'Sample file has been saved successfully.',
        placement: 'bottomRight'
      });
    });
}
