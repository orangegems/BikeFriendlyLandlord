import * as types from "../actions/actionTypes";

const initState = {
  data: {},
  isLandlord: null,
};

export default function userReducer(state = initState, action) {
  // pull data from initState,
  // create newState to manipulate
  const { data, isLandlord } = state;
  const newState = { data, isLandlord };

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

    default:
      return state;
  }
}
