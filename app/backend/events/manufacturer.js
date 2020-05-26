import { ipcMain } from 'electron';
import { getManufacturerForFilter, getManufacturer } from '../services/manufacturer';

ipcMain.handle('GET_MANUFACTURERS_FOR_FILTER', async (event) => {
  const manufacturer = await getManufacturerForFilter();
  return manufacturer;
});

ipcMain.handle('GET_MANUFACTURER', async (event, data) => {
  return await getManufacturer(data);
});
