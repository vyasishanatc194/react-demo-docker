import * as types from "./actionTypes";

export const setAuthenticationError = error => ({
  type: types.SET_AUTHENTICATION_ERROR,
  error
});

export const setAuthenticatedStatus = status => ({
  type: types.SET_AUTHENTICATED_STATUS,
  status
});
