import { API, graphqlOperation } from 'aws-amplify';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { listEvents } from '../../../graphql/queries';
import { deleteEvent } from '../../../graphql/mutations';

// Sample data
const initialState = {
  searchText: '',
  events: [],
};

export const getEvents = createAsyncThunk(
  'adminApp/events/getEvents',
  async (filterText) => {
    console.log('eventsSlice => getEvents => start');
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(listEvents, {filter: { title: { contains: filterText}}}));
      console.log('eventsSlice => getEvents => resp => ', resp);
      data = await resp.data;
      console.log(
        'eventsSlice => getEvents => DATA => ',
        data.listEvents.items
      );
    } catch (err) {
      console.log('eventsSlice => getEvents => err => ', err);
    }
    return data.listEvents.items;
  }
);

export const removeEvents = createAsyncThunk(
  'adminApp/events/removeEvents',
  async (opportunityIds, { dispatch, getState }) => {
    console.log("eventsSlice => removeEvents => opportunityIds => ", opportunityIds)
    opportunityIds.forEach(async (id) => {
      await API.graphql(graphqlOperation(deleteEvent, {input: { id: id }}));  
    })
    return opportunityIds;
  }
);

const eventsAdapter = createEntityAdapter({});

export const { selectAll: selectEvents, selectById: selectEventById } =
  eventsAdapter.getSelectors((state) => state.adminApp.events);

export const eventsSlice = createSlice({
  name: 'adminApp/events',
  initialState: eventsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (event) => ({ payload: event.target.value || '' }),
    },
  },
  extraReducers: {
    [getEvents.fulfilled]: eventsAdapter.setAll,
    [removeEvents.fulfilled]: eventsAdapter.removeMany
  },
});

// export const selectEvents = (state) => state.events;
// export const selectSearchText = (state) => state;

export const { setSearchText } = eventsSlice.actions;

export default eventsSlice.reducer;
