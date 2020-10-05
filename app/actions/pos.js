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

export const checkout = ({ customerId, note, PaymentMode, CardNo }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'GET_PRODUCTS_BY_NAME_FOR_POS_REQUEST' });

  ipcRenderer
    .invoke('GET_PRODUCTS_BY_NAME', {
      token,
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

export const checkout = ({ customerId, note, PaymentMode, CardNo }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'CHECKOUT_FOR_POS_REQUEST' });

  ipcRenderer
    .invoke('CHECKOUT', {
      token,
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
        description: 'Product has been saved successgully',
        placement: 'bottomRight'
      });

      return { isAdded: true };
    });
};
