import { ipcMain } from 'electron';
import { getCategoryForFilter, getCategories } from '../services/category';

ipcMain.handle('GET_CATEGORIES_FOR_FILTER', async (event) => {
  const categories = await getCategoryForFilter();
  return categories;
});

ipcMain.handle('GET_CATEGORY', async (event, data) => {
  return await getCategories(data);
});
