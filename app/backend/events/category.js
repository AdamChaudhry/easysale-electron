import { ipcMain } from 'electron';
import { getCategoryForFilter, getCategories, saveCategory, deleteCategory } from '../services/category';
import authenticateUser from '../services/auth/authenticateUser'

ipcMain.handle('GET_CATEGORIES_FOR_FILTER', async (event) => {
  const categories = await getCategoryForFilter();
  return categories;
});

ipcMain.handle('GET_CATEGORY', async (event, data) => {
  return await getCategories(data);
});

ipcMain.handle('SAVE_CATEGORY', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await saveCategory({ user, ...rest });
});

ipcMain.handle('DELETE_CATEGORY', async (event, { token, ...rest }) => {
  const { user, error } = await authenticateUser({ token });
  if (error) return { error };

  return await deleteCategory({ user, ...rest });
});
