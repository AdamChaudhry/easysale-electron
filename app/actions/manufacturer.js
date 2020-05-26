import { ipcRenderer } from 'electron';

export const getManufacturers = () => (dispatch, getState) => {
  const { manufacturers } = getState();
  const { filter, pagination } = manufacturers || {};
  const { pageNo, pageSize } = pagination || {};

  dispatch({ type: 'GET_MANUFACTURER_REQUEST' });

  ipcRenderer
    .invoke('GET_MANUFACTURER', {
      filter,
      limit: pageSize,
      skip: (pageNo - 1) * pageSize
    })
    .then(data => {
      const { manufacturers: filterCategory, total } = data || {};
      return dispatch({
        type: 'GET_MANUFACTURER_SUCCESS',
        payload: { manufacturers: filterCategory, total }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_MANUFACTURER_FAILED' });
    });
};

export const SetFilter = ({ key, value }) => (dispatch, getState) => {
  const { manufacturers } = getState();
  const { filter } = manufacturers || {};

  if (value) filter[key] = value;
  else delete filter[key];

  dispatch({
    type: 'SET_FILTER_FOR_MANUFACTURER',
    payload: { filter }
  });
};

export const setPage = ({ pageNo }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_NUMBER_FOR_MANUFACTURER',
    payload: { pageNo }
  });
};

export const setPageSize = ({ pageSize }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_SIZE_FOR_MANUFACTURER',
    payload: { pageSize }
  });
};
