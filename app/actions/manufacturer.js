import { ipcRenderer } from 'electron';
import { notification } from 'antd';

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
      const { manufacturers: filterManufacturer, total } = data || {};
      return dispatch({
        type: 'GET_MANUFACTURER_SUCCESS',
        payload: { manufacturers: filterManufacturer, total }
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

export const saveManufacturer = ({
  name,
  code,
  description,
  imageUrl
}) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'SAVE_MANUFACTURER_REQUEST' });

  return ipcRenderer
    .invoke('SAVE_MANUFACTURER', {
      token,
      name,
      code,
      description,
      imageUrl
    })
    .then(data => {
      const { error } = data || {};
      if (error) throw new Error(error);

      dispatch({ type: 'SAVE_MANUFACTURER_SUCCESS' });

      notification.success({
        message: 'Save Manufacturer',
        description: 'Manufacturer has been saved successfully',
        placement: 'bottomRight'
      });

      return { isAdded: true };
    })
    .catch((error) => {
      notification.error({
        message: 'Save Manufacturer',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'SAVE_MANUFACTURER_FAILED' });

      return { error };
    });
};

export const deleteManufacturer = ({ id }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'DELETE_MANUFACTURER_REQUEST' });

  return ipcRenderer
    .invoke('DELETE_MANUFACTURER', {
      token,
      id
    })
    .then(data => {
      const { error } = data || {};
      if (error) throw new Error(error);

      dispatch({ type: 'DELETE_MANUFACTURER_SUCCESS' });

      notification.success({
        message: 'Delete Manufacturer',
        description: 'Manufacturer has been deleted successfully',
        placement: 'bottomRight'
      });

      return { isDeleted: true };
    })
    .catch((error) => {
      notification.error({
        message: 'Delete Manufacturer',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'DELETE_MANUFACTURER_FAILED' });

      return { error: error.message };
    });
}

export const updateManufacturer = ({
  id,
  name,
  code,
  description,
  imageUrl
}) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'UPDATE_MANUFACTURER_REQUEST' });

  return ipcRenderer
    .invoke('UPDATE_MANUFACTURER', {
      token,
      id,
      name,
      code,
      description,
      imageUrl
    })
    .then(data => {
      const { error } = data || {};
      if (error) throw new Error(error);

      dispatch({ type: 'UPDATE_MANUFACTURER_SUCCESS' });

      notification.success({
        message: 'Update Manufacturer',
        description: 'Manufacturer has been updated successfully',
        placement: 'bottomRight'
      });

      return { isAdded: true };
    })
    .catch((error) => {
      notification.error({
        message: 'Update Manufacturer',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'UPDATE_MANUFACTURER_FAILED' });

      return { error: error.message };
    });
}
