import { ipcMain } from 'electron';
import { getSales } from '../services/sale';

ipcMain.handle('GET_SALE_HISTORY', async (event, data) => {
  const sales = await getSales(data);
  return sales;
});
