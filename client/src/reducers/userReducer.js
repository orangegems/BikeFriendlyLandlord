import * as types from "../actions/actionTypes";

const initState = {
  data: {},
  isLandlord: null,
  isLoggedIn: false,
};

export default function userReducer(state = initState, action) {
  // pull data from initState,
  // create newState to manipulate
  const { data, isLandlord, isLoggedIn } = state;
  const newState = { data, isLandlord, isLoggedIn };

  switch (action.type) {
    // set user data upon login
    case types.SET_USER:
      // newState mutation here
      newState.data = action.payload;

      if (newState.data.landlord_id) {
        newState.isLandLord = true;
      } else {
        newState.isLandlord = false;
      }

      return newState;

    case types.SET_IS_LOGGED_IN:
      // newState mutation here
      newState.isLoggedIn = action.payload;
      if(!newState.isLoggedIn) newState.isLandlord = null;
      return newState;

    default:
      return state;
  }
}
