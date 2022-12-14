import { API, graphqlOperation } from 'aws-amplify';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { listOpportunities } from '../../../graphql/queries';
import { deleteOpportunity } from '../../../graphql/mutations';

// Sample data
const initialState = {
  searchText: '',
  opportunities: [],
};

export const getOpportunities = createAsyncThunk(
  'adminApp/opportunties/getOpportunities',
  async (filterText) => {
    console.log('opportunitiesSlice => getOpportunities => start');
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(listOpportunities, {filter: { title: { contains: filterText}}}));
      console.log('opportunitiesSlice => getOpportunities => resp => ', resp);
      data = await resp.data;
      console.log(
        'opportunitiesSlice => getOpportunities => DATA => ',
        data.listOpportunities.items
      );
    } catch (err) {
      console.log('opportunitiesSlice => getOpportunities => err => ', err);
    }
    return data.listOpportunities.items;
  }
);

export const removeOpportunities = createAsyncThunk(
  'adminApp/opportunities/removeOpportunities',
  async (opportunityIds, { dispatch, getState }) => {
    console.log("opportunitiesSlice => removeOpportunities => opportunityIds => ", opportunityIds)
    opportunityIds.forEach(async (id) => {
      await API.graphql(graphqlOperation(deleteOpportunity, {input: { id: id }}));  
    })
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
    [removeOpportunities.fulfilled]: opportunitiesAdapter.removeMany
  },
});

// export const selectOpportunities = (state) => state.opportunities;
// export const selectSearchText = (state) => state;

export const { setSearchText } = opportunitiesSlice.actions;

export default opportunitiesSlice.reducer;
