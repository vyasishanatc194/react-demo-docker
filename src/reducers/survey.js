import * as types from "../actions/actionTypes";

const initialState = {
  active: {}
};

const survey = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_ACTIVE_SURVEYS:
      return {
        activeSurvey: {
          ...action.data
        }
      };
    default:
      return state;
  }
};

export default survey;
