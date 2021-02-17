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
      token,
      filter: {
        keyword: name
      },
      limit: 100
    })
    .then(data => {
      const { products } = data || {};
      return dispatch({
        type: 'GET_PRODUCTS_BY_NAME_FOR_POS_SUCCESS',
        payload: { products }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_PRODUCTS_BY_NAME_FOR_POS_FAILED' });
    });
};

export const checkout = (data) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'CHECKOUT_FOR_POS_REQUEST' });

  return ipcRenderer
    .invoke('CHECKOUT', {
      token,
      data
    })
    .then((data) => {
      const { product, error } = data || {};

      if (error) throw new Error(error);
      dispatch({ type: 'CHECKOUT_FOR_POS_SUCCESS' });
    })
    .catch((error) => {
      dispatch({ type: 'CHECKOUT_FOR_POS_FAILED' });

      notification.error({
        message: 'SAVE PRODUCT',
        description: error.message,
        placement: 'bottomRight'
      });

      return { isAdded: true };
    });
};
