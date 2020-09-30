import * as types from "../actions/actionTypes";

const initialState = {
  theme: [],
  votingCity:'',
  votingUser:'',
};

const bestIdeas = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BEST_IDEA_THEME:
      return {
        ...state,
        theme: action.values
      };
    case types.SET_VOTING_CITY : 
      return {
        ...state,
        votingCity:action.values
      }
    case types.SET_VOTING_USER :
      return {
        ...state,
        votingUser:action.values
      }
    default:
      return state;
  }
};

export default bestIdeas;
