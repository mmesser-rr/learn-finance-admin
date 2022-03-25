import { API, graphqlOperation } from 'aws-amplify';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { listOpportunities } from '../../../graphql/queries';

// Sample data
const initialState = {
  searchText: '',
  opportunities: [],
};

export const getOpportunities = createAsyncThunk(
  'adminApp/opportunties/getOpportunities',
  async () => {
    console.log('opportunitiesSlice => getOpportunities => start ...');
    const resp = await API.graphql(graphqlOperation(listOpportunities));
    const data = await resp.data;
    console.log(
      'opportunitiesSlice => getOpportunities => DATA => ',
      resp.data.listOpportunities.items
    );
    return data.listOpportunities.items;
  }
);

export const removeOpportunities = createAsyncThunk(
  'adminApp/opportunities/removeOpportunities',
  async (opportunityIds, { dispatch, getState }) => {
    return opportunityIds;
  }
);

const opportunitiesAdapter = createEntityAdapter({});

export const { selectAll: selectOpportunities, selectById: selectOpportunityById } =
  opportunitiesAdapter.getSelectors((state) => state.adminApp.opportunities);

export const opportunitiesSlice = createSlice({
  name: 'adminApp/opportunities',
  initialState: opportunitiesAdapter.getInitialState({
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
    [getOpportunities.fulfilled]: opportunitiesAdapter.setAll,
    [removeOpportunities.fulfilled]: (state, action) =>
      opportunitiesAdapter.removeMany(state, action.payload),
  },
});

// export const selectOpportunities = (state) => state.opportunities;
// export const selectSearchText = (state) => state;

export const { setSearchText } = opportunitiesSlice.actions;

export default opportunitiesSlice.reducer;
