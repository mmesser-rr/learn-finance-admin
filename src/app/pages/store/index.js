import { combineReducers } from '@reduxjs/toolkit';
import opportunities from './opportunitiesSlice';
import events from './eventsSlice';
import learns from './learnsSlice';
import rewards from './rewardsSlice';
// import opportunity from './opportunitySlice';

const reducer = combineReducers({
  opportunities,
  // opportunity,
  events,
  learns,
  rewards
});

export default reducer;
