import * as types from "./actionTypes";

// updates state to hold current user data
export const setUserData = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const setAuthDisplay = (boolean) => ({
  type: types.SET_AUTH_DISPLAY,
  payload: boolean,
});

export const setIsLoggedIn = (boolean) => ({
  type: types.SET_IS_LOGGED_IN,
  payload: boolean,
});

export const searchResults = (searchResults) => ({
  type: types.POPULATE_SEARCH_RESULTS,
  payload: searchResults,
});

export const populateTopFour = (topFour) => ({
  type: types.POPULATE_TOP_FOUR,
  payload: topFour,
});
