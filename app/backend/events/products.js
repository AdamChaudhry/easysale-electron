import { ipcMain } from 'electron';
import { getProducts } from '../services/product';

ipcMain.handle('GET_PRODUCTS', async (event, data) => {
  const product = await getProducts(data);
  return product;
});
