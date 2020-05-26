const initialState = {
  loading: 0,
  manufacturers: [],
  total: 0,
  filter: {},
  pagination: {
    pageNo: 1,
    pageSize: 25
  }
};

const boxes = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MANUFACTURER_REQUEST': {
      return {
        ...state,
        loading: ++state.loading
      };
    }
    case 'GET_MANUFACTURER_FAILED':
    case 'GET_MANUFACTURER_SUCCESS': {
      return {
        ...state,
        loading: --state.loading,
        ...action.payload
      };
    }
    case 'SET_PAGE_SIZE_FOR_MANUFACTURER':
    case 'SET_PAGE_NUMBER_FOR_MANUFACTURER': {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...action.payload
        }
      };
    }
    case 'SET_FILTER_FOR_MANUFACTURER': {
      return {
        ...state,
        ...action.payload
      }
    }
    default: {
      return state;
    }
  }
};

export default boxes;
