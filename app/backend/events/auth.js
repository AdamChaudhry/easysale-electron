import { ipcMain } from 'electron';
import { login } from '../services/auth';

ipcMain.handle('LOGIN', async (event, data) => {
  const user = await login(data);
  return user;
});
