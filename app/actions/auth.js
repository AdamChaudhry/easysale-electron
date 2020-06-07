import { ipcRenderer } from 'electron';
import { notification } from 'antd';

export const login = ({ email, password }) => (dispatch) => {

  dispatch({ type: 'LOGIN_REQUEST' });

  ipcRenderer
    .invoke('LOGIN', {
      email,
      password
    })
    .then(data => {
      const { user, token } = data || {};

      localStorage.setItem('session', JSON.stringify({
        user,
        token
      }));

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
    })
    .catch((err) => {
      notification.error({
        message: 'Login',
        description: 'Invalid Email or Password',
        placement: 'bottomRight'
      });

      dispatch({ type: 'LOGIN_FAILED' });
    });
};
