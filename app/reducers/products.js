const initialState = {
  loading: false,
  products: []
};

const boxes = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS_REQUEST': {
      return {
        ...state,
        loading: true
      };
    }
    case 'GET_PRODUCTS_FAILED':
    case 'GET_PRODUCTS_SUCCESS': {
      return {
        ...state,
        loading: false,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export default boxes;
