import * as types from './actionTypes';

export const toggleProConModal = (value) => ({
  type: types.TOGGLE_PRO_CON_MODAL,
  value,
});

export const addThreadInfoProConModal = (data) => ({
  type: types.ADD_THREAD_INFO_PRO_CON_MODAL,
  data,
});

export const clearInfoProConModal = () => ({
  type: types.CLEAR_INFO_PRO_CON_MODAL,
});
