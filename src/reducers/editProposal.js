import * as types from "../actions/actionTypes";

const initialState = {
  visible: false,
  subject: "",
  content: "action.content",
  hashtags: "",
  id: 0
};

const editProposal = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_EDIT_PROPOSAL_VISIBLE:
      return {
        ...state,
        visible: action.visible
      };

    case types.UPDATE_EDIT_THREAD:
      return {
        ...state,
        subject: action.subject,
        content: action.content,
        hashtags: action.hashtags,
        id: action.id
      };

    default:
      return state;
  }
};

export default editProposal;
