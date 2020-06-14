import { ipcMain } from 'electron';
import { getManufacturerForFilter, getManufacturer, saveManufacturer, updateManufacturer, deleteManufacturer } from '../services/manufacturer';
import authenticateUser from '../services/auth/authenticateUser';

ipcMain.handle('GET_MANUFACTURERS_FOR_FILTER', async (event) => {
  const manufacturer = await getManufacturerForFilter();
  return manufacturer;
});

ipcMain.handle('GET_MANUFACTURER', async (event, data) => {
  return await getManufacturer(data);
});

ipcMain.handle('SAVE_MANUFACTURER', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await saveManufacturer({ user, ...rest });
});

ipcMain.handle('DELETE_MANUFACTURER', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await deleteManufacturer({ user, ...rest });
});

ipcMain.handle('UPDATE_MANUFACTURER', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await updateManufacturer({ user, ...rest });
});
