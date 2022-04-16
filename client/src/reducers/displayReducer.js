import * as types from "../actions/actionTypes";

const initState = {
  authDisplay: false,
  searchResults: [],
  topFourLandlords: [],
  isLoggedIn: false,
};

export default function displayReducer(state = initState, action) {
  // pull data from initState,
  // create newState to manipulate

  const { authDisplay, searchResults, topFourLandlords, isLoggedIn } = state;
  const newState = { authDisplay, searchResults, topFourLandlords, isLoggedIn };

  switch (action.type) {
    // set user data upon login
    case types.TOGGLE_AUTH_DISPLAY:
      // newState mutation here
      newState.authDisplay = !authDisplay;
      return newState;

    case types.TOGGLE_IS_LOGGED_IN:
      // newState mutation here
      newState.isLoggedIn = action.payload;
      return newState;

    case types.POPULATE_SEARCH_RESULTS:
      newState.searchResults = action.payload;
      return newState;

    case types.POPULATE_TOP_FOUR:
      newState.topFourLandlords = action.payload;
      return newState;

    default:
      return state;
  }
}
