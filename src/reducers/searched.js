import * as types from '../actions/actionTypes';

const initialState = {
  showThreads: 9,
  threads: {},
  totalThreads: { Oberhausen: 0, Bottrop: 0, Herne: 0, total: 0 },
  totalSearchedThreads: 0,
  hasSearched: false,
  loadingThreads: true,
};

const searched = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SHOW_THREADS:
      return {
        ...state,
        showThreads: action.value,
      };
    case types.SAVE_SEARCHED_THREADS:
      return {
        ...state,
        threads: action.data,
        loadingThreads: false,
      };
    case types.SAVE_SEARCHED_THREADS_NUMBER:
      return {
        ...state,
        totalSearchedThreads: action.value,
      };
    case types.UPDATE_TOTAL_THREADS:
      return {
        ...state,
        totalThreads: action.value,
      };
    case types.HAS_SEARCHED:
      return {
        ...state,
        hasSearched: action.value,
      };
    default:
      return state;
  }
};

export default searched;
