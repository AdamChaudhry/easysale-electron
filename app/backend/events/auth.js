import { IpcMain, ipcMain } from 'electron';

ipcMain.on('auth', (data) => {
  console.log('....................', data);
});
