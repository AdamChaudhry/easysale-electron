const initialState = {
  loading: 0,
  customers: [],
};

const pos = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CUSTOMERS_REQUEST': {
      return {
        ...state,
        loading: ++state.loading
      };
    }
    case 'GET_CUSTOMERS_FAILED':
    case 'GET_CUSTOMERS_SUCCESS': {
      return {
        ...state,
        loading: --state.loading,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default pos;
