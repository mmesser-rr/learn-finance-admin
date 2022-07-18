import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOpportunityFormData } from '../../../graphql/customQueries';
import FuseUtils from '@fuse/utils/FuseUtils'
import {
  createOpportunity,
  createOrganization,
  deleteOrganization,
  updateOpportunity,
  deleteOpportunity
} from '../../../graphql/mutations';

export const removeOrganizationThunk = createAsyncThunk(
  'adminApp/Opportunity/deleteOrganization',

  async (params) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(deleteOrganization, params));
    } catch (err) {
      console.log('opportunitySlice => deleteOrganization => err => ', err);
    }
    return data;
  }
);

export const fetchOpportunityThunk = createAsyncThunk(
  'adminApp/Opportunity/getOpportunity',

  async (params) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(getOpportunityFormData, params));
      data = await resp.data;
      console.log('fetchOpportunityThunk => data => ', data)      
      return data === undefined ? null : data;
    } catch (err) {
      console.log('opportunitySlice => fetchOpportunityThunk => err => ', err);
    }
    return data;
  }
);

export const removeOpportunity = createAsyncThunk(
  'adminApp/Opportunity/removeOpportunity',
  async (id, { dispatch, getState }) => {
    const data = { id }
    await API.graphql(
      graphqlOperation(deleteOpportunity, {
        input: data
      })
    );

    return id;
  }
);

export const saveOpportunityThunk = createAsyncThunk(
  'adminApp/Opportunity/saveOpportunity',
  async (OpportunityData, { dispatch, getState }) => {
    const data = OpportunityData;
    let response;

    try {
      // Upload the images
      console.log('opportunitySlice => saveOpportunity => data1 => ', data);
      const logoUri = `opportunities/${data.id}/logo.jpg`;
      const heroPhotoUri = `opportunities/${data.id}/heroPhoto.jpg`;
      await Storage.put(logoUri, await (await fetch(data.logoUri)).blob(), {
        contentType: 'images/jpg',
      });
      await Storage.put(heroPhotoUri, await (await fetch(data.heroPhotoUri)).blob(), {
        contentType: 'images/jpg',
      });
      data.logoUri = logoUri;
      data.heroPhotoUri = heroPhotoUri;

      delete data["organizations"]

      console.log('opportunitySlice => saveOpportunity => data2 => ', data);

      // Parse datetime
      if (!data.startDateTime || !data.endDateTime) return null;
      if (Number.isFinite(data.startDateTime) === false) {
        data.startDateTime = Date.parse(data.startDateTime);
      }
      if (Number.isFinite(data.endDateTime) === false) {
        data.endDateTime = Date.parse(data.endDateTime);
      }

      response = await API.graphql(
        graphqlOperation(updateOpportunity, {
          input: data
        })
      );
    } catch (err) {
      console.log('opportunitySlice => saveOpportunity => err => ', err);
    }
    return response?.data?.updateOpportunity;
  }
);

export const createOpportunityThunk = createAsyncThunk(
  'adminApp/Opportunity/createOpportunity',
  async (data, { dispatch, getState }) => {
    let response;
    try {
      // Upload the images
      console.log('FuseUtils.generateGUID()', FuseUtils.generateGUID())
      console.log('FuseUtils.generateGUID()', FuseUtils.generateGUID())
      const logoUri = `opportunities/${FuseUtils.generateGUID()}/logo.jpg`;
      const heroPhotoUri = `opportunities/${FuseUtils.generateGUID()}/heroPhoto.jpg`;
      await Storage.put(logoUri, await (await fetch(data.logoUri)).blob(), {
        contentType: 'images/jpg',
      });
      await Storage.put(heroPhotoUri, await (await fetch(data.heroPhotoUri)).blob(), {
        contentType: 'images/jpg',
      });
      data.logoUri = logoUri;
      data.heroPhotoUri = heroPhotoUri;

      delete data["organizations"]

      console.log('opportunitySlice => saveOpportunity => data => ', data);

      // Parse datetime
      if (!data.startDateTime || !data.endDateTime) return null;
      if (Number.isFinite(data.startDateTime) === false) {
        data.startDateTime = Date.parse(data.startDateTime);
      }
      if (Number.isFinite(data.endDateTime) === false) {
        data.endDateTime = Date.parse(data.endDateTime);
      }

      response = await API.graphql(
        graphqlOperation(createOpportunity, {
          input: data
        })
      );
    } catch (err) {
      console.log('opportunitySlice => saveOpportunity => err => ', err);
    }
    return response?.data?.createOpportunity
  }
)

export const saveOpportunity1 = createAsyncThunk(
  'adminApp/Opportunity/saveOpportunity',
  async (OpportunityData, { dispatch, getState }) => {
    const logo = OpportunityData.logoUri;
    const background = OpportunityData.heroPhotoUri;
    const { organizations } = OpportunityData;
    const data = OpportunityData;
    data.logoUri = '';
    data.heroPhotoUri = '';
    delete data.organizations;
    const arrOrganizations = [];

    try {
      console.log('opportunitySlice => saveOpportunity => data1 => ', data);
      console.log('startDateTime number?', Number.isNaN(data.startDateTime));
      if (Number.isNaN(data.startDateTime) === true) {
        data.startDateTime = Date.parse(data.startDateTime);
        console.log('startDateTime parsed', Date.parse(data.startDateTime));
      }
      // data.endDateTime = Date.parse(data.endDateTime);
      console.log('opportunitySlice => saveOpportunity => data2 => ', data);
      const resp = await API.graphql(
        graphqlOperation(createOpportunity, {
          input: data,
        })
      );
      const newOpportunity = resp.data.createOpportunity;
      const newId = resp.data.createOpportunity.id;

      // Upload the images
      const logoUri = `opportunities/${newId}/logo.jpg`;
      const heroPhotoUri = `opportunities/${newId}/heroPhoto.jpg`;
      const logoResult = await Storage.put(logoUri, await (await fetch(logo)).blob(), {
        contentType: 'images/jpg',
      });
      const bgResult = await Storage.put(heroPhotoUri, await (await fetch(background)).blob(), {
        contentType: 'images/jpg',
      });
      const updateResp = await API.graphql(
        graphqlOperation(updateOpportunity, {
          input: {
            id: newId,
            logoUri,
            heroPhotoUri,
          },
        })
      );

      // Add any organization relationships
      if (organizations !== null) {
        await Promise.all(
          organizations.map(async (r) => {
            const organization = {
              displayName: r.displayName,
              relationshipType: r.relationshipType,
              opportunityId: newId,
            };
            const orgResp = await API.graphql(
              graphqlOperation(createOrganization, {
                input: organization,
              })
            );
          })
        );
        // data.organizations = arrOrganizations;
        return newOpportunity;
      }
    } catch (err) {
      console.log('opportunitySlice => saveOpportunity => err => ', err);
    }
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
          heroPhotoUri: '',
          categories: ['NFT'],
          creator: null,
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
          logoUri: '',
          onlineReserved: 0,
          onlineTotal: 0,
          organizationId: '',
          registrationUrl: 'http://go.com',
          reward: 100,
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
    [fetchOpportunityThunk.fulfilled]: (state, action) => action.payload,
    [saveOpportunityThunk.fulfilled]: (state, action) => action.payload,
    [removeOpportunity.fulfilled]: (state, action) => null,
  },
});

export const { newOpportunity, resetOpportunity } = OpportunitySlice.actions;

export default OpportunitySlice.reducer;
