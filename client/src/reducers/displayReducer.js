import * as types from "../actions/actionTypes";

const initState = {
  authDisplay: false,
  searchResults: [],
};

export default displayReducer = (state = initState, action) => {
  // pull data from initState,
  // create newState to manipulate
  const {authDisplay, searchResults} = state;
  const newState = {authDisplay, searchResults};

  switch (action.type) {
    // set user data upon login
    case types.TOGGLE_AUTH_DISPLAY:
      // newState mutation here
      newState.authDisplay = !authDisplay;
      return newState;

    case types.POPULATE_SEARCH_RESULTS:
      newState.searchResults=action.payload;
      return newState;

    default:
      return state;
  }
};
