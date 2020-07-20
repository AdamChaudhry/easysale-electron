import { ipcRenderer } from 'electron';
import { notification } from 'antd';

export const getProducts = () => (dispatch, getState) => {
  const { products } = getState();
  const { filter, pagination } = products || {};
  const { pageNo, pageSize } = pagination || {};

  dispatch({ type: 'GET_PRODUCTS_REQUEST' });

  ipcRenderer
    .invoke('GET_PRODUCTS', {
      filter,
      limit: pageSize,
      skip: (pageNo - 1) * pageSize
    })
    .then(data => {
      const { products: filterProduct, total } = data || {};
      return dispatch({
        type: 'GET_PRODUCTS_SUCCESS',
        payload: { products: filterProduct, total }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_PRODUCTS_FAILED' });
    });
};

export const getCategory = () => dispatch => {
  dispatch({ type: 'GET_CATEGORIES_FOR_PRODUCTS_REQUEST' });

  ipcRenderer
    .invoke('GET_CATEGORIES_FOR_FILTER')
    .then((data) => {
      const { categories } = data || {};
      return dispatch({
        type: 'GET_CATEGORIES_FOR_PRODUCTS_SUCCESS',
        payload: { categories }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_CATEGORIES_FOR_PRODUCTS_FAILED' });
    });
};

export const getManufacturer = () => dispatch => {
  dispatch({ type: 'GET_MANUFACTURERS_FOR_PRODUCTS_REQUEST' });

  ipcRenderer
    .invoke('GET_MANUFACTURERS_FOR_FILTER')
    .then((data) => {
      const { manufacturers } = data || {};
      return dispatch({
        type: 'GET_MANUFACTURERS_FOR_PRODUCTS_SUCCESS',
        payload: { manufacturers }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_MANUFACTURERS_FOR_PRODUCTS_FAILED' });
    });
};

export const SetFilter = ({ key, value }) => (dispatch, getState) => {
  const { products } = getState();
  const { filter } = products || {};

  if (value) filter[key] = value;
  else delete filter[key];

  dispatch({ type: 'SET_FILTER_FOR_PRODUCT' });
};

export const setPage = ({ pageNo }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_NUMBER_FOR_PRODUCT',
    payload: { pageNo }
  });
};

export const setPageSize = ({ pageSize }) => (dispatch) => {
  dispatch({
    type: 'SET_PAGE_SIZE_FOR_PRODUCT',
    payload: { pageSize }
  });
};

export const getProductsByName = ({ name }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'GET_PRODUCTS_BY_NAME_REQUEST' });

  return ipcRenderer
    .invoke('GET_PRODUCTS_BY_NAME', {
      token,
      filter: {
        keyword: name
      }
    })
    .then(data => {
      const { products, error } = data || {};

      if (error) throw new Error(error);
      dispatch({
        type: 'GET_PRODUCTS_BY_NAME_SUCCESS',
        payload: { products }
      });
    })
    .catch((error) => {
      notification.error({
        message: 'GET PRODUCT BY NAME',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'GET_PRODUCTS_BY_NAME_FAILED' });
    });
}

export const saveProduct = ({
  name,
  code,
  type,
  description,
  manufacturer,
  category,
  price,
  cost,
  minQty,
  imageUrl,
  comboProducts
}) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'SAVE_PRODUCT_REQUEST' });

  return ipcRenderer
    .invoke('SAVE_PRODUCT', {
      token,
      name,
      code,
      type,
      description,
      manufacturer,
      category,
      price,
      cost,
      minQty,
      imageUrl,
      comboProducts
    })
    .then(data => {
      const { product, error } = data || {};

      if (error) throw new Error(error);
      dispatch({
        type: 'SAVE_PRODUCT_SUCCESS',
        payload: { product }
      });

      notification.success({
        message: 'SAVE PRODUCT',
        description: 'Product has been saved successgully',
        placement: 'bottomRight'
      });

      return { isAdded: true };
    })
    .catch((error) => {
      notification.error({
        message: 'SAVE PRODUCT',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'SAVE_PRODUCT_FAILED' });
      return { error };
    });
}

export const getComboProducts = ({ ids }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'GET_COMBO_PRODUCTS_REQUEST' });

  return ipcRenderer
    .invoke('GET_COMBO_PRODUCTS', {
      token,
      ids
    })
    .then(data => {
      const { products, error } = data || {};

      if (error) throw new Error(error);
      dispatch({
        type: 'GET_COMBO_PRODUCTS_SUCCESS',
        payload: { comboProducts: products }
      });
      return { products };
    })
    .catch((error) => {
      notification.error({
        message: 'GET PRODUCT BY NAME',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'GET_COMBO_PRODUCTS_FAILED' });
      return { error };
    });
}

export const getExportProducts = ({ ids }) => (dispatch, getState) => {
  const { auth, products } = getState();
  const { token } = auth || {};

  const { filter } = products || {};

  dispatch({ type: 'GET_EXPORT_PRODUCTS_REQUEST' });

  return ipcRenderer
    .invoke('GET_EXPORT_PRODUCTS', {
      token,
      filter
    })
    .then(data => {
      const { products, error } = data || {};

      if (error) throw new Error(error);
      dispatch({
        type: 'GET_EXPORT_PRODUCTS_SUCCESS',
        payload: { exportProducts: products }
      });
      return { products };
    })
    .catch((error) => {
      notification.error({
        message: 'EXPORT PRODUCTS',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'GET_EXPORT_PRODUCTS_FAILED' });
      return { error };
    });
}
