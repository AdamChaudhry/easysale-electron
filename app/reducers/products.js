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
  manufacturers: []
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
    default: {
      return state;
    }
  }
};

export default boxes;
