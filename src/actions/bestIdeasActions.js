import * as types from './actionTypes';

export const setBestIdeaTheme = (values) => ({
  type: types.SET_BEST_IDEA_THEME,
  values
});

export const setVotingCity = (values) => ({
  type:types.SET_VOTING_CITY,
  values,
});

export const setVotingUser = (values) => ({
  type:types.SET_VOTING_USER,
  values,
});
