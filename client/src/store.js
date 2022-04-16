import { createStore } from 'redux';
import reducers from './reducers/index';

// we are adding composeWithDevTools here to get easy access to the Redux dev tools
export default store = createStore(
  reducers
);