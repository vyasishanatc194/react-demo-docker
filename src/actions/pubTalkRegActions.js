import * as types from './actionTypes';

export const togglePubTalkRegModal = (payload) => ({
  type: types.TOGGLE_PUB_TALK_REG_MODAL,
  payload,
});

export const setSelectedPubTalk = (payload) => ({
  type: types.SET_SELECTED_PUB_TALK,
  payload,
});
