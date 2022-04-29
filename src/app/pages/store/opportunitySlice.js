import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOpportunity } from '../../../graphql/queries';
import { createOpportunity, updateOpportunity } from '../../../graphql/mutations';

export const fetchOpportunity = createAsyncThunk(
  'adminApp/Opportunity/getOpportunity',
  async (params) => {
    let data;
    try {
      console.log('opportunitySlice => fetchOpportunity => ', params);
      const resp = await API.graphql(graphqlOperation(getOpportunity, params));
      data = await resp.data;

      return data === undefined ? null : data;
    } catch (err) {
      console.log('opportunitySlice => fetchOpportunity => err => ', err);
    }
    return data;
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
    // const { Opportunity } = getState().adminApp;
    const logo = OpportunityData.logoPath;
    const background = OpportunityData.backgroundPath;

    const data = OpportunityData;
    data.logoPath = '';
    data.backgroundPath = '';
    try {
      const resp = await API.graphql(
        graphqlOperation(createOpportunity, {
          input: data,
        })
      );
      const newId = resp.data.createOpportunity.id;
      const logoPath = `opportunities/${newId}/logo.jpg`;
      const backgroundPath = `opportunities/${newId}/bg.jpg`;
      console.log('opportunitySlice => saveOpportunity => resp', resp);
      // Upload the images
      const logoResult = await Storage.put(logoPath, logo);
      const bgResult = await Storage.put(backgroundPath, background);
      console.log('logoResult', logoResult);
      console.log('bgResult', bgResult);
      const updateResp = await API.graphql(
        graphqlOperation(updateOpportunity, {
          input: { id: newId, logoPath, backgroundPath },
        })
      );
    } catch (err) {
      console.log('opportunitySlice => saveOpportunity => err => ', err);
    }
    // console.log('opportunitySlice => saveOpportunity => response', response);

    // const response = await axios.post('/api/e-commerce-app/Opportunity/save', {
    //   ...Opportunity,
    //   ...OpportunityData,
    // });
    // const data = await response.data;
    const dataEmpty = {};
    return dataEmpty;
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
          // id: FuseUtils.generateGUID(),
          backgroundPath: '',
          categories: ['NFT'],
          creator: '',
          createdDateTime: Date.now(),
          details: 'details',
          detailsTldr: 'details tldr',
          endDateTime: Date.now(),
          eventType: 'IRL',
          isPrivate: false,
          location: { lat: 0, lon: 0 },
          locationDetail: {
            address: 'address',
            unit: 'unit',
            city: 'city',
            state: 'state',
            zipCode: 'zip',
            country: 'country',
            name: 'name',
          },
          logoPath: '',
          onlineReserved: 0,
          onlineTotal: '',
          organizationId: '',
          registrationUrl: 'http://go.com',
          reward: '100',
          rewardDetails: '$WEALTH',
          seatsReserved: 0,
          seatsTotal: 100,
          startDateTime: Date.now(),
          status: 'PENDING',
          subtitle: 'subtitle',
          tags: ['Outdoors'],
          title: 'title',
          timezone: '',
          updatedDateTime: '',
          websitePrompt: 'Learn More',
          websiteUrl: 'http://go.com',
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
