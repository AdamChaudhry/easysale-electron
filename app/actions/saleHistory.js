import { ipcRenderer } from 'electron';

export const getProducts = () => (dispatch, getState) => {
  const { products } = getState();
  const { filter, pagination } = products || {};
  const { pageNo, pageSize } = pagination || {};

  dispatch({ type: 'GET_SALE_HISTORY_REQUEST' });

  ipcRenderer
    .invoke('GET_SALE_HISTORY', {
      filter,
      limit: pageSize,
      skip: (pageNo - 1) * pageSize
    })
    .then(data => {
      const { sales: filterProduct, total } = data || {};
      return dispatch({
        type: 'GET_SALE_HISTORY_SUCCESS',
        payload: { saleHistory: filterProduct, total }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_SALE_HISTORY_FAILED' });
    });
};

export const getCategory = () => dispatch => {
  dispatch({ type: 'GET_CATEGORIES_FOR_SALE_HISTORY_REQUEST' });

  ipcRenderer
    .invoke('GET_CATEGORIES_FOR_FILTER')
    .then((data) => {
      const { categories } = data || {};
      return dispatch({
        type: 'GET_CATEGORIES_FOR_SALE_HISTORY_SUCCESS',
        payload: { categories }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_CATEGORIES_FOR_SALE_HISTORY_FAILED' });
    });
};

export const getManufacturer = () => dispatch => {
  dispatch({ type: 'GET_MANUFACTURERS_FOR_SALE_HISTORY_REQUEST' });

  ipcRenderer
    .invoke('GET_MANUFACTURERS_FOR_FILTER')
    .then((data) => {
      const { manufacturers } = data || {};
      return dispatch({
        type: 'GET_MANUFACTURERS_FOR_SALE_HISTORY_SUCCESS',
        payload: { manufacturers }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_MANUFACTURERS_FOR_SALE_HISTORY_FAILED' });
    });
};

export const SetFilter = ({ key, value }) => (dispatch, getState) => {
  const { products } = getState();
  const { filter } = products || {};

  if (value) filter[key] = value;
  else delete filter[key];

  dispatch({ type: 'SET_FILTER_FOR_SALE_HISTORY' });
};

export const setPage = ({ pageNo }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_NUMBER_FOR_SALE_HISTORY',
    payload: { pageNo }
  });
};

export const setPageSize = ({ pageSize }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_SIZE_FOR_SALE_HISTORY',
    payload: { pageSize }
  });
};
