const initialState = {
  loading: 0,
  saleHistory: [],
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
    case 'GET_MANUFACTURERS_FOR_SALE_HISTORY_REQUEST':
    case 'GET_CATEGORIES_FOR_SALE_HISTORY_REQUEST':
    case 'GET_SALE_HISTORY_REQUEST': {
      return {
        ...state,
        loading: ++state.loading
      };
    }
    case 'GET_MANUFACTURERS_FOR_SALE_HISTORY_FAILED':
    case 'GET_MANUFACTURERS_FOR_SALE_HISTORY_SUCCESS':
    case 'GET_CATEGORIES_FOR_SALE_HISTORY_FAILED':
    case 'GET_CATEGORIES_FOR_SALE_HISTORY_SUCCESS':
    case 'GET_SALE_HISTORY_FAILED':
    case 'GET_SALE_HISTORY_SUCCESS': {
      return {
        ...state,
        loading: --state.loading,
        ...action.payload
      };
    }
    case 'SET_PAGE_SIZE_FOR_SALE_HISTORY':
    case 'SET_PAGE_NUMBER_FOR_SALE_HISTORY': {
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
