import * as types from "../actions/actionTypes";

const initState = {
  data: {},
};

export default function userReducer(state = initState, action) {
  // pull data from initState,
  // create newState to manipulate
  const { data } = state;
  const newState = { data };

  switch (action.type) {
    // set user data upon login
    case types.SET_USER:
      // newState mutation here
      newState.data = action.payload.user;
      return newState;

    // reset user to blank upon logout
    case types.RESET_USER:
      newState.data = {};
      return newState;

    default:
      return state;
  }
};
