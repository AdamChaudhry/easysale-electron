import { ipcMain } from 'electron';
import { getSales, checkout } from '../services/sale';
import authenticateUser from '../services/auth/authenticateUser';

ipcMain.handle('GET_SALE_HISTORY', async (event, data) => {
  const sales = await getSales(data);
  return sales;
});

ipcMain.handle('CHECKOUT', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await checkout({ user, ...rest.data });
});
