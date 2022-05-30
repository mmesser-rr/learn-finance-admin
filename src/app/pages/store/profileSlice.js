import { API, graphqlOperation, Storage } from 'aws-amplify';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import { setUserDataCognito } from 'app/auth/store/userSlice';
import { getAthlete } from '../../../graphql/queries';
import { updateAthlete } from '../../../graphql/mutations';

export const savePhoto = createAsyncThunk(
  'adminApp/Profile/saveProfilePhoto',
  async (ProfilePhotoData, { dispatch, getState }) => {
    const { userId, image, type } = ProfilePhotoData;
    try {
      const photoUri = `users/${userId}/media/${type}Photo.png`;
      const photoKey = await Storage.put(photoUri, await (await fetch(image)).blob(), {
        contentType: 'image/png',
      });
      const key = type === 'profile' ? 'profilePhotoUri' : 'heroPhotoUri';
      const userData =
        type === 'profile'
          ? { id: userId, profilePhotoUri: photoUri }
          : { id: userId, heroPhotoUri: photoUri };
      const updateResp = await API.graphql(
        graphqlOperation(updateAthlete, {
          input: userData,
        })
      );
      dispatch(setUserDataCognito({ username: userId }));
      dispatch(
        showMessage({
          message: 'Saved',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          variant: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showMessage({
          message: 'Error saving photo',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          variant: 'error',
        })
      );
      console.log('profileSlice => saveProfilePhoto => err => ', err);
    }
  }
);
export const getPhoto = createAsyncThunk(
  'adminApp/Profile/getPhoto',
  async (key, { dispatch, getState }) => {
    let url;
    try {
      const resp = await Storage.get(key, { download: false, expires: 36 });
      console.log('profileSlice => getPhoto => key => ', resp);
      if (resp !== null) {
        url = resp;
      } else {
        url = '';
      }
    } catch (err) {
      dispatch(
        showMessage({
          message: 'Could not fetch photo',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          variant: 'error',
        })
      );
      console.log('profileSlice => getHeroPhoto => err => ', err);
    }
    return url;
  }
);
export const getProfile = createAsyncThunk(
  'adminApp/Profile/getProfile',
  async (params, { dispatch, getState }) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(getAthlete, params));
      data = await resp.data;
      return data === undefined ? null : data;
    } catch (err) {
      dispatch(
        showMessage({
          message: 'Error fetching profile',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          variant: 'error',
        })
      );
      console.log('profileSlice => getProfile => err => ', err);
    }
    return data;
  }
);

export const saveProfile = createAsyncThunk(
  'adminApp/Profile/saveProfile',
  async (ProfileData, { dispatch, getState }) => {
    const data = ProfileData;
    data.address = {
      streetAddress: '',
      apt: '',
      city: '',
      state: '',
      zipCode: '',
    };
    try {
      const resp = await API.graphql(
        graphqlOperation(updateAthlete, {
          id: data.id,
          input: data,
        })
      );
      dispatch(setUserDataCognito({ username: data.id }));

      dispatch(
        showMessage({
          message: 'Saved',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          variant: 'success',
        })
      );
    } catch (err) {
      dispatch(
        showMessage({
          message: 'Error saving photo',
          autoHideDuration: 2000,
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          variant: 'error',
        })
      );
      console.log('profileSlice => saveProfile => err => ', err);
    }

    const dataEmpty = {};
    return dataEmpty;
  }
);

const ProfileSlice = createSlice({
  name: 'adminApp/Profile',
  initialState: null,
  reducers: {
    resetProfile: () => null,
    newProfile: {
      reducer: (state, action) => action.payload,
      prepare: (event) => ({
        firstName: '',
      }),
    },
  },
  extraReducers: {
    [saveProfile.fulfilled]: (state, action) => action.payload,
  },
});

export const { newProfile } = ProfileSlice.actions;

export default ProfileSlice.reducer;
