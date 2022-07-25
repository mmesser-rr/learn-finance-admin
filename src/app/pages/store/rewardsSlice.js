import { API, graphqlOperation } from 'aws-amplify';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { listRewards } from '../../../graphql/queries';
import { deleteReward } from '../../../graphql/mutations';

// Sample data
const initialState = {
  searchText: '',
  rewards: [],
};

export const getRewards = createAsyncThunk(
  'adminApp/rewards/getRewards',
  async (filterText) => {
    console.log('rewardsSlice => getRewards => start');
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(listRewards, {filter: { title: { contains: filterText}}}));
      console.log('rewardsSlice => getRewards => resp => ', resp);
      data = await resp.data;
      console.log(
        'rewardsSlice => getRewards => DATA => ',
        data.listRewards.items
      );
    } catch (err) {
      console.log('rewardsSlice => getRewards => err => ', err);
    }
    return data.listRewards.items;
  }
);

export const removeRewards = createAsyncThunk(
  'adminApp/rewards/removeRewards',
  async (opportunityIds, { dispatch, getState }) => {
    console.log("rewardsSlice => removeRewards => opportunityIds => ", opportunityIds)
    opportunityIds.forEach(async (id) => {
      await API.graphql(graphqlOperation(deleteReward, {input: { id: id }}));  
    })
    return opportunityIds;
  }
);

const rewardsAdapter = createEntityAdapter({});

export const { selectAll: selectRewards, selectById: selectRewardById } =
  rewardsAdapter.getSelectors((state) => state.adminApp.rewards);

export const rewardsSlice = createSlice({
  name: 'adminApp/rewards',
  initialState: rewardsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (reward) => ({ payload: reward.target.value || '' }),
    },
  },
  extraReducers: {
    [getRewards.fulfilled]: rewardsAdapter.setAll,
    [removeRewards.fulfilled]: rewardsAdapter.removeMany
  },
});

// export const selectRewards = (state) => state.rewards;
// export const selectSearchText = (state) => state;

export const { setSearchText } = rewardsSlice.actions;

export default rewardsSlice.reducer;
