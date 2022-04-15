import { combineReducers } from 'redux';

// import all reducers here
import userReducer from './userReducer';
import displayReducer from './displayReducer';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  currentUser: userReducer,
  display: displayReducer,
});

// make the combined reducers available for import
export default reducers;