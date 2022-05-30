import { combineReducers } from '@reduxjs/toolkit';
import opportunities from './opportunitiesSlice';
// import opportunity from './opportunitySlice';

const reducer = combineReducers({
  opportunities,
  // opportunity,
});

export default reducer;
