const { ipcMain } = require('electron');
const { products } = require('../services')

ipcMain.handle('GET_PRODUCTS', async (event, data) => {
  const product = await products.getAll({});
  return product;
});