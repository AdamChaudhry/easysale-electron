import { ipcMain } from 'electron';
import { getManufacturerForFilter } from '../services/manufacturer';

ipcMain.handle('GET_MANUFACTURERS_FOR_FILTER', async (event) => {
  const manufacturer = await getManufacturerForFilter();
  return manufacturer;
});
