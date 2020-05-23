const { ipcRenderer } = require("electron");

export const getProducts = () => (dispatch) => {
  dispatch({ type: 'GET_PRODUCTS_REQUEST' });

  ipcRenderer.invoke('GET_PRODUCTS', {
    data: "123"
  })
    .then((data) => {
      const { products } = data || {};
      dispatch({
        type: 'GET_PRODUCTS_SUCCESS',
        payload: { products }
      });
    })
    .catch(() => {
      dispatch({ type: 'GET_PRODUCTS_FAILED' });
    });
};
