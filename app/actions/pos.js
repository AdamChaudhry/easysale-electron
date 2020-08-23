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
