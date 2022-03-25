import { API, graphqlOperation } from 'aws-amplify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import FuseUtils from '@fuse/utils';
import { getOpportunity } from '../../../graphql/queries';

export const fetchOpportunity = createAsyncThunk(
  'adminApp/Opportunity/getOpportunity',
  async (params) => {
    console.log('opportunitySlice => fetchOpportunity => , params');
    const resp = await API.graphql(graphqlOperation(getOpportunity, params));
    const data = await resp.data;
    return data === undefined ? null : data;
  }
);

export const removeOpportunity = createAsyncThunk(
  'adminApp/Opportunity/removeOpportunity',
  async (val, { dispatch, getState }) => {
    const { id } = getState().adminApp.Opportunity;
    // await axios.post('/api/e-commerce-app/remove-Opportunity', { id });

    return id;
  }
);

export const saveOpportunity = createAsyncThunk(
  'adminApp/Opportunity/saveOpportunity',
  async (OpportunityData, { dispatch, getState }) => {
    const { Opportunity } = getState().adminApp;

    // const response = await axios.post('/api/e-commerce-app/Opportunity/save', {
    //   ...Opportunity,
    //   ...OpportunityData,
    // });
    // const data = await response.data;
    const data = {};
    return data;
  }
);

const OpportunitySlice = createSlice({
  name: 'adminApp/Opportunity',
  initialState: null,
  reducers: {
    resetOpportunity: () => null,
    newOpportunity: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          id: FuseUtils.generateGUID(),
          title: '',
          subtitle: '',
          logoPath: '',
        },
      }),
    },
  },
  extraReducers: {
    [fetchOpportunity.fulfilled]: (state, action) => action.payload,
    [saveOpportunity.fulfilled]: (state, action) => action.payload,
    [removeOpportunity.fulfilled]: (state, action) => null,
  },
});

export const { newOpportunity, resetOpportunity } = OpportunitySlice.actions;

export default OpportunitySlice.reducer;
