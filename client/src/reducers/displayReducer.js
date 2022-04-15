import * as types from "../actions/actionTypes";

const initState = {
  authDisplay: false,
};

export default displayReducer = (state = initState, action) => {
  // pull data from initState,
  // create newState to manipulate
  const { authDisplay } = state;
  const newState = { authDisplay };

  switch (action.type) {
    // set user data upon login
    case types.TOGGLE_AUTH_DISPLAY:
      // newState mutation here
      newState.authDisplay = !authDisplay;
      return newState;

    default:
      return state;
  }
};
