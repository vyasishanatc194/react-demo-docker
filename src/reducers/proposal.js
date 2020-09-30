import * as types from "../actions/actionTypes";

const initialState = {
  visible: false,
};

const proposal = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_VISIBLE:
      return {
        ...state,
        visible: action.visible
      };

    default:
      return state;
  }
};

export default proposal;
