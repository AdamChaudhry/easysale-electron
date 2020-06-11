import { ipcRenderer } from 'electron';

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

  ipcRenderer
    .invoke('SAVE_CATEGORY', {
      token,
      name,
      code,
      description,
      imageUrl
    })
    .then(data => {
      const { categories: filterCategory, total } = data || {};
      return dispatch({
        type: 'SAVE_CATEGORY_SUCCESS',
        payload: { categories: filterCategory, total }
      });
    })
    .catch(() => {
      dispatch({ type: 'SAVE_CATEGORY_FAILED' });
    });
};
