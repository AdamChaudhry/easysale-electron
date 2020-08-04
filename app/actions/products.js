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

  return ipcRenderer
    .invoke('GET_CATEGORIES_FOR_FILTER')
    .then((data) => {
      const { categories } = data || {};
      dispatch({
        type: 'GET_CATEGORIES_FOR_PRODUCTS_SUCCESS',
        payload: { categories }
      });

      return { categories };
    })
    .catch(() => {
      dispatch({ type: 'GET_CATEGORIES_FOR_PRODUCTS_FAILED' });
    });
};

export const getManufacturer = () => dispatch => {
  dispatch({ type: 'GET_MANUFACTURERS_FOR_PRODUCTS_REQUEST' });

  return ipcRenderer
    .invoke('GET_MANUFACTURERS_FOR_FILTER')
    .then((data) => {
      const { manufacturers } = data || {};
      dispatch({
        type: 'GET_MANUFACTURERS_FOR_PRODUCTS_SUCCESS',
        payload: { manufacturers }
      });

      return { manufacturers };
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

export const getExportProducts = ({ ids, names, codes }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'GET_EXPORT_PRODUCTS_REQUEST' });

  return ipcRenderer
    .invoke('GET_EXPORT_PRODUCTS', {
      token,
      filter: {
        ids,
        names,
        codes
      }
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

export const bulkInsertCategory = ({ newCategories }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'BULK_INSERT_CATEGORIES_FOR_IMPORT_PRODUCTS_REQUEST' });

  return ipcRenderer
    .invoke('BULK_INSERT_CATEGORIES_FOR_IMPORT_PRODUCTS', {
      token,
      categories: newCategories
    })
    .then(data => {
      const { categories, error } = data || {};
      if (error) throw new Error(error);
      dispatch({
        type: 'BULK_INSERT_CATEGORIES_FOR_IMPORT_PRODUCTS_SUCCESS',
        payload: { categories }
      });

      return { categories };
    })
    .catch((error) => {
      notification.error({
        message: 'EXPORT PRODUCTS',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'BULK_INSERT_CATEGORIES_FOR_IMPORT_PRODUCTS_FAILED' });
      return { error };
    });
}

export const bulkInsertManufacturer = ({ newManufacturers }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'BULK_INSERT_MANUFACTURER_FOR_IMPORT_PRODUCTS_REQUEST' });

  return ipcRenderer
    .invoke('BULK_INSERT_MANUFACTURER_FOR_IMPORT_PRODUCTS', {
      token,
      manufacturers: newManufacturers
    })
    .then(data => {
      const { manufacturers, error } = data || {};

      if (error) throw new Error(error);
      dispatch({
        type: 'BULK_INSERT_MANUFACTURER_FOR_IMPORT_PRODUCTS_SUCCESS',
        payload: { manufacturers }
      });

      return { manufacturers };
    })
    .catch((error) => {
      notification.error({
        message: 'EXPORT PRODUCTS',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'BULK_INSERT_MANUFACTURER_FOR_IMPORT_PRODUCTS_FAILED' });
      return { error };
    });
}

export const bulkInsertProducts = ({ newProducts }) => (dispatch, getState) => {
  const { auth } = getState();
  const { token } = auth || {};

  dispatch({ type: 'BULK_INSERT_PRODUCTS_FOR_IMPORT_PRODUCTS_REQUEST' });

  return ipcRenderer
    .invoke('BULK_INSERT_PRODUCTS_FOR_IMPORT_PRODUCTS', {
      token,
      products: newProducts
    })
    .then((data) => {
      const { products, error } = data || {};

      if (error) throw new Error(error);
      dispatch({
        type: 'BULK_INSERT_PRODUCTS_FOR_IMPORT_PRODUCTS_SUCCESS',
        payload: { products }
      });

      notification.success({
        message: 'IMPORT PRODUCTS',
        description: `${newProducts.length} Products have been imported successfully.`,
        placement: 'bottomRight'
      });

      return { products };
    })
    .catch((error) => {
      notification.error({
        message: 'IMPORT PRODUCTS',
        description: error.message,
        placement: 'bottomRight'
      });

      dispatch({ type: 'BULK_INSERT_PRODUCTS_FOR_IMPORT_PRODUCTS_FAILED' });
      return { error };
    });
}
