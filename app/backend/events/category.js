import { ipcMain } from 'electron';
import { getCategoryForFilter } from '../services/category';

ipcMain.handle('GET_CATEGORIES_FOR_FILTER', async (event) => {
  const categories = await getCategoryForFilter();
  return categories;
});
