import * as types from '../actions/actionTypes';

const initialState = {
  user_info: {
    name: '',
    email: '',
    is_admin: false,
    is_ambassador: false,
    created_at: null,
    updated_at: null,
  },
  user_threads: [],
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_USER_INFO:
      return {
        ...state,
        user_info: {
          ...state.user_info,
          ...action.data,
        },
      };
    case types.CLEAR_USER_INFO:
      return {
        user_info: initialState.user_info,
      };
    case types.SAVE_USER_THREADS:
      return {
        ...state,
        user_threads: action.data,
      };
    case types.SAVE_ANON_THREAD_ID:
      return {
        ...state,
        user_info: {
          ...state.user_info,
          anon_thread_id: action.data,
        },
      };

    default:
      return state;
  }
};

export default user;
