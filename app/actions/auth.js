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

      localStorage.setItem('session', JSON.stringify({ token }));

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

export const authenticateUser = () => (dispatch, getState) => {
  const { token } = getState().auth;
  dispatch({ type: 'AUTHENTICATE_USER_REQUEST' });

  ipcRenderer
    .invoke('AUTHENTICATE_USER', { token })
    .then(data => {
      const { user, error } = data || {};

      if (error) throw new Error(error);

      dispatch({
        type: 'AUTHENTICATE_USER_SUCCESS',
        payload: { user }
      });
    })
    .catch((err) => {
      dispatch({ type: 'AUTHENTICATE_USER_FAILED' });
    });
};
