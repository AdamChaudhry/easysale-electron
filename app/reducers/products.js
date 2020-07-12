const initialState = {
  loading: 0,
  products: [],
  total: 0,
  filter: {},
  pagination: {
    pageNo: 1,
    pageSize: 25
  },
  categories: [],
  manufacturers: [],
  newProduct: {
    products: [],
    loading: 0
  },
  editProduct: {
    comboProducts: [],
    loadingComboProducts: 0
  }
};

const boxes = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MANUFACTURERS_FOR_PRODUCTS_REQUEST':
    case 'GET_CATEGORIES_FOR_PRODUCTS_REQUEST':
    case 'GET_PRODUCTS_REQUEST': {
      return {
        ...state,
        loading: ++state.loading
      };
    }
    case 'GET_MANUFACTURERS_FOR_PRODUCTS_FAILED':
    case 'GET_MANUFACTURERS_FOR_PRODUCTS_SUCCESS':
    case 'GET_CATEGORIES_FOR_PRODUCTS_FAILED':
    case 'GET_CATEGORIES_FOR_PRODUCTS_SUCCESS':
    case 'GET_PRODUCTS_FAILED':
    case 'GET_PRODUCTS_SUCCESS': {
      return {
        ...state,
        loading: --state.loading,
        ...action.payload
      };
    }
    case 'SET_PAGE_SIZE_FOR_PRODUCT':
    case 'SET_PAGE_NUMBER_FOR_PRODUCT': {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };
    }
    case 'SAVE_PRODUCT_REQUEST':
    case 'GET_PRODUCTS_BY_NAME_REQUEST': {
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          loading: ++state.newProduct.loading
        }
      };
    }
    case 'SAVE_PRODUCT_FAILED':
    case 'SAVE_PRODUCT_SUCCESS':
    case 'GET_PRODUCTS_BY_NAME_FAILED':
    case 'GET_PRODUCTS_BY_NAME_SUCCESS': {
      return {
        ...state,
        newProduct: {
          ...state.newProduct,
          loading: --state.newProduct.loading,
          ...action.payload
        }
      };
    }
    case 'GET_COMBO_PRODUCTS_REQUEST': {
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          loadingComboProducts: ++state.editProduct.loadingComboProducts
        }
      }
    }
    case 'GET_COMBO_PRODUCTS_FAILED':
    case 'GET_COMBO_PRODUCTS_SUCCESS': {
      return {
        ...state,
        editProduct: {
          ...state.editProduct,
          loadingComboProducts: --state.editProduct.loadingComboProducts,
          ...action.payload
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default boxes;
