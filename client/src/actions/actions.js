import * as types from "./actionTypes";

// user reducer
export const setUserData = (user) => ({
  type: types.SET_USER,
  payload: user,
});

export const setIsLoggedIn = (boolean) => ({
  type: types.SET_IS_LOGGED_IN,
  payload: boolean,
});


// display reducer
export const setAuthDisplay = (boolean) => ({
  type: types.SET_AUTH_DISPLAY,
  payload: boolean,
});

export const searchResults = (searchResults) => ({
  type: types.POPULATE_SEARCH_RESULTS,
  payload: searchResults,
});
