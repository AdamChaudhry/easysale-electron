let initialState = {
  loading: 0,
  user: {},
  token: null
};

let session = localStorage.getItem('session');
if (session) {
  session = JSON.parse(session);
}

initialState = {
  ...initialState,
  ...session
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER_REQUEST':
    case 'LOGIN_REQUEST': {
      return {
        ...state,
        loading: ++state.loading
      };
    }
    case 'AUTHENTICATE_USER_FAILED':
    case 'AUTHENTICATE_USER_SUCCESS':
    case 'LOGIN_FAILED':
    case 'LOGIN_SUCCESS': {
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

export default authReducer;
