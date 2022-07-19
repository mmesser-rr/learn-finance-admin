import { combineReducers } from '@reduxjs/toolkit';
import opportunities from './opportunitiesSlice';
import events from './eventsSlice';
// import opportunity from './opportunitySlice';

const reducer = combineReducers({
  opportunities,
  // opportunity,
  events
});

export default reducer;
