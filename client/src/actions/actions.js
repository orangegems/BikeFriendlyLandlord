import * as types from './actionTypes';

// updates state to hold current user data
export const setUserData = user => ({
  type: types.SET_USER,
  payload: user,
});

// removes current user from state upon logout
export const resetUserData = () => ({
  type: types.RESET_USER,
  payload: null,
});

export const toggleAuthDisplay = () => ({
  type: types.TOGGLE_AUTH_DISPLAY,
  payload: null
})
