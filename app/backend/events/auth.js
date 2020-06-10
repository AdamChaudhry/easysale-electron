import { ipcMain } from 'electron';
import { login, authenticateUser } from '../services/auth';

ipcMain.handle('LOGIN', async (event, data) => {
  const user = await login(data);
  return user;
});

ipcMain.handle('AUTHENTICATE_USER', async (event, data) => {
  const user = await authenticateUser(data);
  return user;
});
