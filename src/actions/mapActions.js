import * as types from "./actionTypes";

export const updateUserPinVisibilityAction = data => ({
  type: types.UPDATE_PIN_VISIBILITY,
  data
});

export const updateUserPinPositionAction = (lat, long) => ({
  type: types.UPDATE_PIN_POSITION,
  lat,
  long
});

export const addProposalDetailsAction = (proposal) => ({
  type: types.ADD_PROPOSAL_DETAILS,
  proposal
});

export const setPinModeAction = (pinMode) => ({
  type: types.SET_PIN_MODE,
  pinMode
});

export const setThemeModeAction = (mode) => ({
  type: types.SET_THEME_MODE,
  mode
});

export const updatePopularHashTagsAction = (hashtags) => ({
  type: types.UPDATE_POPULAR_HASHTAGS,
  hashtags
});

export const resetMapAction = () => ({
  type: types.RESET_MAP,
});

export const toggleConfirmation = value => ({
  type: types.TOGGLE_CONFIRMATION,
  value
});

export const setCityAction = value => ({
  type: types.SET_CITY,
  city: value
});
