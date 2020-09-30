import * as types from "./actionTypes";

export const updateVisibleAction = data => ({
  type: types.UPDATE_EDIT_PROPOSAL_VISIBLE,
  visible: data
});

export const updateDataToEditThreadAction = data => ({
  type: types.UPDATE_EDIT_THREAD,
  subject: data.subject,
  content: data.content,
  hashtags: data.hashtags,
  id: data.id,
});