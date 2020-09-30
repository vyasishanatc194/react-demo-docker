import * as types from "../actions/actionTypes";

const initialState = {
  visible: false,
};

const newIdea = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NEW_IDEA_VISIBLE:
      return {
        ...state,
        visible: action.visible
      };

    default:
      return state;
  }
};

export default newIdea;
