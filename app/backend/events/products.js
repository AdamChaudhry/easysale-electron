import { ipcMain } from 'electron';
import keytar from 'keytar';
import { getProducts } from '../services/product';

ipcMain.handle('GET_PRODUCTS', async (event, data) => {
    const product = await getProducts(data);
    return product;
});

