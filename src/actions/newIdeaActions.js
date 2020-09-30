import * as types from "./actionTypes";

export const setNewIdeaVisibleAction = data => ({
  type: types.SET_NEW_IDEA_VISIBLE,
  visible: data
});
