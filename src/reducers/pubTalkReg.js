import * as types from '../actions/actionTypes';

const initialState = {
  visible: false,
  pubTalk: {},
};

const pubTalkReg = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_PUB_TALK_REG_MODAL:
      return {
        ...state,
        visible: action.payload,
      };
    case types.SET_SELECTED_PUB_TALK:
      return {
        ...state,
        pubTalk: action.payload,
      };
    default:
      return state;
  }
};

export default pubTalkReg;
