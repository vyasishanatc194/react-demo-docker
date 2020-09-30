import * as types from '../actions/actionTypes';

const initialState = {
  authenticated: false,
  authenticationError: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_AUTHENTICATION_ERROR:
      return {
        ...state,
        authenticationError: action.error,
      };
    case types.SET_AUTHENTICATED_STATUS:
      return {
        ...state,
        authenticated: action.status,
      };
    default:
      return state;
  }
};

export default auth;
