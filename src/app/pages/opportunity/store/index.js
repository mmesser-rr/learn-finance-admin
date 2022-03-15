import { combineReducers } from '@reduxjs/toolkit';
import opportunities from './opportunitiesSlice';

const reducer = combineReducers({
  opportunities,
});

export default reducer;
