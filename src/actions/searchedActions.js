import * as types from './actionTypes';

export const changeShowThreads = (value) => ({
  type: types.CHANGE_SHOW_THREADS,
  value
});

export const saveSearchedThreads = (data) => ({
  type: types.SAVE_SEARCHED_THREADS,
  data
});

export const saveSearchedThreadsNumber = (value) => ({
  type: types.SAVE_SEARCHED_THREADS_NUMBER,
  value
});

export const updateTotalThreads = (value) => ({
  type: types.UPDATE_TOTAL_THREADS,
  value
});

export const toggleHasSearched = (value) => ({
  type: types.HAS_SEARCHED,
  value
});
