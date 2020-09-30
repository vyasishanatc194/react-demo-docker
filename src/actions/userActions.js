import * as types from './actionTypes';

export const saveUserInfo = (data) => ({
  type: types.SAVE_USER_INFO,
  data
});

export const clearUserInfo = () => ({
  type: types.CLEAR_USER_INFO
});

export const saveUserThreads = (data) => ({
  type: types.SAVE_USER_THREADS,
  data
});

export const saveAnonThreadIdAction = (data) => ({
  type: types.SAVE_ANON_THREAD_ID,
  data
});
