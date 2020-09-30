import * as types from "./actionTypes";

export const updateVisibleAction = data => ({
  type: types.UPDATE_VISIBLE,
  visible: data
});
