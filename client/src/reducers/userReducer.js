import * as types from "../actions/actionTypes";

const initState = {
  data: {},
  isLoggedIn: false,
  isLandlord: null,
};

export default function userReducer(state = initState, action) {
  // pull data from initState,
  // create newState to manipulate
  const { data, isLoggedIn, isLandlord } = state;
  const newState = { data, isLoggedIn, isLandlord };

  switch (action.type) {
    // set user data upon login
    case types.SET_USER:
      // newState mutation here
      newState.data = action.payload;
      newState.isLandlord = newState.data.is_landlord;
      return newState;

    case types.SET_IS_LOGGED_IN:
      // newState mutation here
      newState.isLoggedIn = action.payload;
      if (!newState.isLoggedIn) newState.isLandlord = null;
      return newState;

    default:
      return state;
  }
}
