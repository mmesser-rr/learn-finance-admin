import { combineReducers } from '@reduxjs/toolkit';
import opportunities from './opportunitiesSlice';
import events from './eventsSlice';
import learns from './learnsSlice'
// import opportunity from './opportunitySlice';

const reducer = combineReducers({
  opportunities,
  // opportunity,
  events,
  learns
});

export default reducer;
