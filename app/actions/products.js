import { ipcRenderer } from 'electron';

export const getProducts = () => (dispatch, getState) => {
  const { product } = getState();
  const { filters } = product || {};
  dispatch({ type: 'GET_PRODUCTS_REQUEST' });

  ipcRenderer
    .invoke('GET_PRODUCTS', {
      filters
    })
    .then(data => {
      const { products } = data || {};
      return dispatch({
        type: 'GET_PRODUCTS_SUCCESS',
        payload: { products }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_PRODUCTS_FAILED' });
    });
};

export const getCategory = () => dispatch => {
  dispatch({ type: 'GET_CATEGORIES_REQUEST' });

  ipcRenderer
    .invoke('GET_CATEGORIES', {
      data: '123'
    })
    .then(data => {
      const { products } = data || {};
      return dispatch({
        type: 'GET_CATEGORIES_SUCCESS',
        payload: { products }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_CATEGORIES_FAILED' });
    });
};

export const SetFilter = ({ key, value }) => (dispatch, getState) => {
  const { product } = getState();
  const { filter } = product || {};

  if (value) filter[key] = value;
  else delete filter[key];

  dispatch({ type: 'SET_FILTER_FOR_PRODUCT' });
};
