import { ipcMain } from 'electron';
import { getCustomers } from '../services/customer';
import authenticateUser from '../services/auth/authenticateUser'

ipcMain.handle('GET_CUSTOMERS', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await getCustomers({ user, ...rest });
});
