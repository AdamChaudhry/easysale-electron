import { ipcRenderer } from 'electron';
import { notification } from 'antd';

export const getCategories = () => (dispatch, getState) => {
  const { categories } = getState();
  const { filter, pagination } = categories || {};
  const { pageNo, pageSize } = pagination || {};

  dispatch({ type: 'GET_CATEGORY_REQUEST' });

  ipcRenderer
    .invoke('GET_CATEGORY', {
      filter,
      limit: pageSize,
      skip: (pageNo - 1) * pageSize
    })
    .then(data => {
      const { categories: filterCategory, total } = data || {};
      return dispatch({
        type: 'GET_CATEGORY_SUCCESS',
        payload: { categories: filterCategory, total }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_CATEGORY_FAILED' });
    });
};

export const SetFilter = ({ key, value }) => (dispatch, getState) => {
  const { categories } = getState();
  const { filter } = categories || {};

  if (value) filter[key] = value;
  else delete filter[key];

  dispatch({
    type: 'SET_FILTER_FOR_CATEGORY',
    payload: { filter }
  });
};

export const setPage = ({ pageNo }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_NUMBER_FOR_CATEGORY',
    payload: { pageNo }
  });
};

export const setPageSize = ({ pageSize }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_SIZE_FOR_CATEGORY',
    payload: { pageSize }
  });
};

export const saveCategory = ({
  name,
  code,
  description,
  imageUrl
}) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'SAVE_CATEGORY_REQUEST' });

  return ipcRenderer
    .invoke('SAVE_CATEGORY', {
      token,
      name,
      code,
      description,
      imageUrl
    })
    .then(data => {
      const { error } = data || {};
      if (error) throw new Error(error);

      dispatch({ type: 'SAVE_CATEGORY_SUCCESS' });

      notification.success({
        message: 'Save Category',
        description: 'Category has been saved successfully',
        placement: 'bottomRight'
      });

      return { isAdded: true };
    })
    .catch((error) => {
      notification.error({
        message: 'Save Category',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'SAVE_CATEGORY_FAILED' });

      return { error };
    });
};

export const deleteCategory = ({ id }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'DELETE_CATEGORY_REQUEST' });

  return ipcRenderer
    .invoke('DELETE_CATEGORY', {
      token,
      id
    })
    .then(data => {
      const { error } = data || {};
      if (error) throw new Error(error);

      dispatch({ type: 'DELETE_CATEGORY_SUCCESS' });

      notification.success({
        message: 'Delete Category',
        description: 'Category has been deleted successfully',
        placement: 'bottomRight'
      });

      return { isDeleted: true };
    })
    .catch((error) => {
      notification.error({
        message: 'Delete Category',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'DELETE_CATEGORY_FAILED' });

      return { error: error.message };
    });
  }
