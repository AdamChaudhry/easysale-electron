import xlsx from 'xlsx';
import { get } from 'lodash';

export const exportAsXlsx = ({ columns, data }) => {
  const sheetData = data.map((dataRow) => {
    return columns.map(({ field }) => get(dataRow, field, 'N/A'));
  });

  const worksheet = xlsx.utils.aoa_to_sheet(sheetData);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Products');
  xlsx.writeFile(workbook, `Export_Produxts_${Date.now()}.xlsx`);
}
