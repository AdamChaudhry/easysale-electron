import { ipcRenderer } from 'electron';
import { notification } from 'antd';

export const getCustomers = () => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'GET_CUSTOMERS_REQUEST' });

  ipcRenderer
    .invoke('GET_CUSTOMERS', {
      token
    })
    .then(data => {
      const { customers } = data || {};
      return dispatch({
        type: 'GET_CUSTOMERS_SUCCESS',
        payload: { customers }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_CUSTOMERS_FAILED' });
    });
};

export const getProductsByName = ({ name }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'GET_PRODUCTS_BY_NAME_FOR_POS_REQUEST' });

  ipcRenderer
    .invoke('GET_PRODUCTS_BY_NAME', {
      token
    })
    .then(data => {
      const { customers } = data || {};
      return dispatch({
        type: 'GET_PRODUCTS_BY_NAME_FOR_POS_SUCCESS',
        payload: { customers }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_PRODUCTS_BY_NAME_FOR_POS_FAILED' });
    });
};
