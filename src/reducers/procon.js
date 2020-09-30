import * as types from 'Actions/actionTypes';

const initialState = {
  showProConModal: false,
  thread: {},
};

const procon = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_PRO_CON_MODAL:
      return {
        ...state,
        showProConModal: action.value,
      };
    case types.ADD_THREAD_INFO_PRO_CON_MODAL:
      return {
        ...state,
        thread: action.data,
      };
    case types.CLEAR_INFO_PRO_CON_MODAL:
      return {
        ...state,
        thread: {},
      };
    default:
      return state;
  }
};

export default procon;
