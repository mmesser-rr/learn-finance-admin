import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEvent } from '../../../graphql/queries';
import FuseUtils from '@fuse/utils/FuseUtils'
import {
  createEvent,
  updateEvent,
  deleteEvent
} from '../../../graphql/mutations';

export const fetchEventThunk = createAsyncThunk(
  'adminApp/Event/getEvent',

  async (params) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(getEvent, params));
      data = await resp.data;
      console.log('fetchEventThunk => data => ', data)      
      return data === undefined ? null : data;
    } catch (err) {
      console.log('eventSlice => fetchEventThunk => err => ', err);
    }
    return data;
  }
);

export const removeEvent = createAsyncThunk(
  'adminApp/Event/removeEvent',
  async (id, { dispatch, getState }) => {
    const data = { id }
    await API.graphql(
      graphqlOperation(deleteEvent, {
        input: data
      })
    );

    return id;
  }
);

export const saveEventThunk = createAsyncThunk(
  'adminApp/Event/saveEvent',
  async (EventData, { dispatch, getState }) => {
    const data = EventData;
    let response;

    try {
      // Upload the images
      console.log('eventSlice => saveEvent => data1 => ', data);
      const logoUri = `events/${data.id}/logo.jpg`;
      const heroPhotoUri = `events/${data.id}/heroPhoto.jpg`;
      await Storage.put(logoUri, await (await fetch(data.logoUri)).blob(), {
        contentType: 'images/jpg',
      });
      await Storage.put(heroPhotoUri, await (await fetch(data.heroPhotoUri)).blob(), {
        contentType: 'images/jpg',
      });
      data.logoUri = logoUri;
      data.heroPhotoUri = heroPhotoUri;

      console.log('eventSlice => saveEvent => data2 => ', data);

      // Parse datetime
      if (!data.dateTime) return null;
      if (Number.isFinite(data.dateTime) === false) {
        data.dateTime = Date.parse(data.dateTime);
      }

      response = await API.graphql(
        graphqlOperation(updateEvent, {
          input: data
        })
      );
    } catch (err) {
      console.log('eventSlice => saveEvent => err => ', err);
    }
    return response?.data?.updateEvent;
  }
);

export const createEventThunk = createAsyncThunk(
  'adminApp/Event/createEvent',
  async (data, { dispatch, getState }) => {
    let response;
    try {
      // Upload the images
      const logoUri = `events/${FuseUtils.generateGUID()}/logo.jpg`;
      const heroPhotoUri = `events/${FuseUtils.generateGUID()}/heroPhoto.jpg`;
      await Storage.put(logoUri, await (await fetch(data.logoUri)).blob(), {
        contentType: 'images/jpg',
      });
      await Storage.put(heroPhotoUri, await (await fetch(data.heroPhotoUri)).blob(), {
        contentType: 'images/jpg',
      });
      data.logoUri = logoUri;
      data.heroPhotoUri = heroPhotoUri;

      console.log('eventSlice => saveEvent => data => ', data);

      // Parse datetime
      if (!data.dateTime) return null;
      if (Number.isFinite(data.dateTime) === false) {
        data.dateTime = Date.parse(data.dateTime);
      }

      response = await API.graphql(
        graphqlOperation(createEvent, {
          input: data
        })
      );
    } catch (err) {
      console.log('eventSlice => saveEvent => err => ', err);
    }
    return response?.data?.createEvent
  }
)

export const saveEvent1 = createAsyncThunk(
  'adminApp/Event/saveEvent',
  async (EventData, { dispatch, getState }) => {
    const logo = EventData.logoUri;
    const background = EventData.heroPhotoUri;
    const { organizations } = EventData;
    const data = EventData;
    data.logoUri = '';
    data.heroPhotoUri = '';
    delete data.organizations;
    const arrOrganizations = [];

    try {
      console.log('eventSlice => saveEvent => data1 => ', data);
      console.log('startDateTime number?', Number.isNaN(data.startDateTime));
      if (Number.isNaN(data.startDateTime) === true) {
        data.startDateTime = Date.parse(data.startDateTime);
        console.log('startDateTime parsed', Date.parse(data.startDateTime));
      }
      // data.endDateTime = Date.parse(data.endDateTime);
      console.log('eventSlice => saveEvent => data2 => ', data);
      const resp = await API.graphql(
        graphqlOperation(createEvent, {
          input: data,
        })
      );
      const newEvent = resp.data.createEvent;
      const newId = resp.data.createEvent.id;

      // Upload the images
      const logoUri = `events/${newId}/logo.jpg`;
      const heroPhotoUri = `events/${newId}/heroPhoto.jpg`;
      const logoResult = await Storage.put(logoUri, await (await fetch(logo)).blob(), {
        contentType: 'images/jpg',
      });
      const bgResult = await Storage.put(heroPhotoUri, await (await fetch(background)).blob(), {
        contentType: 'images/jpg',
      });
      const updateResp = await API.graphql(
        graphqlOperation(updateEvent, {
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
              eventId: newId,
            };
            const orgResp = await API.graphql(
              graphqlOperation(createOrganization, {
                input: organization,
              })
            );
          })
        );
        // data.organizations = arrOrganizations;
        return newEvent;
      }
    } catch (err) {
      console.log('eventSlice => saveEvent => err => ', err);
    }
    const dataEmpty = {};
    return dataEmpty;
  }
);

const EventSlice = createSlice({
  name: 'adminApp/Event',
  initialState: null,
  reducers: {
    resetEvent: () => null,
    newEvent: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        payload: {
          // id: FuseUtils.generateGUID(),
          sponsor: "",
          title: "",
          category: "",
          heroPhotoUri: "",
          logoUri: "",
          tagline: "",
          description: "",
          dateTime: Date.now(),
          location: "",
          reward: 100
        },
      }),
    },
  },
  extraReducers: {
    [fetchEventThunk.fulfilled]: (state, action) => action.payload,
    [saveEventThunk.fulfilled]: (state, action) => action.payload,
    [removeEvent.fulfilled]: (state, action) => null,
  },
});

export const { newEvent, resetEvent } = EventSlice.actions;

export default EventSlice.reducer;
