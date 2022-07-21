import { API, graphqlOperation } from 'aws-amplify';
import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { listLearns } from '../../../graphql/queries';
import { deleteLearn } from '../../../graphql/mutations';

// Sample data
const initialState = {
  searchText: '',
  learns: [],
};

export const getLearns = createAsyncThunk(
  'adminApp/learns/getLearns',
  async (filterText) => {
    console.log('learnsSlice => getLearns => start');
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(listLearns, {filter: { title: { contains: filterText}}}));
      console.log('learnsSlice => getLearns => resp => ', resp);
      data = await resp.data;
      console.log(
        'learnsSlice => getLearns => DATA => ',
        data.listLearns.items
      );
    } catch (err) {
      console.log('learnsSlice => getLearns => err => ', err);
    }
    return data.listLearns.items;
  }
);

export const removeLearns = createAsyncThunk(
  'adminApp/learns/removeLearns',
  async (opportunityIds, { dispatch, getState }) => {
    console.log("learnsSlice => removeLearns => opportunityIds => ", opportunityIds)
    opportunityIds.forEach(async (id) => {
      await API.graphql(graphqlOperation(deleteLearn, {input: { id: id }}));  
    })
    return opportunityIds;
  }
);

const learnsAdapter = createEntityAdapter({});

export const { selectAll: selectLearns, selectById: selectLearnById } =
  learnsAdapter.getSelectors((state) => state.adminApp.learns);

export const learnsSlice = createSlice({
  name: 'adminApp/learns',
  initialState: learnsAdapter.getInitialState({
    searchText: '',
  }),
  reducers: {
    setSearchText: {
      reducer: (state, action) => {
        state.searchText = action.payload;
      },
      prepare: (learn) => ({ payload: learn.target.value || '' }),
    },
  },
  extraReducers: {
    [getLearns.fulfilled]: learnsAdapter.setAll,
    [removeLearns.fulfilled]: learnsAdapter.removeMany
  },
});

// export const selectLearns = (state) => state.learns;
// export const selectSearchText = (state) => state;

export const { setSearchText } = learnsSlice.actions;

export default learnsSlice.reducer;
