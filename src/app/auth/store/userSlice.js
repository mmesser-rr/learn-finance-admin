/* eslint import/no-extraneous-dependencies: off */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import 'firebase/compat/auth';
import history from '@history';
import _ from '@lodash';
import { setInitialSettings, setDefaultSettings } from 'app/store/fuse/settingsSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import settingsConfig from 'app/fuse-configs/settingsConfig';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getAthlete } from 'graphql/queries';

export const fetchUserProfile = createAsyncThunk(
  'adminApp/Users/getUserProfile',
  async (params) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(getAthlete, params));
      data = await resp.data;
      return data === undefined ? null : data;
    } catch (err) {
      console.log('userSlice => fetchUserProfile => err => ', err);
    }
    return data;
  }
);

export const setUserDataCognito = (userToken) => async (dispatch) => {
  console.log(`userSlice => setUserDataCognito`, userToken.username);
  // Fetch user from db.
  let data;
  try {
    //   console.log('***');
    const resp = await API.graphql(graphqlOperation(getAthlete, { id: userToken.username }));
    //   console.log('***');
    data = await resp.data;
    //   return data === undefined ? null : data;
  } catch (err) {
    console.log('userSlice => fetchUserProfile => err => ', err);
  }
  // console.log('userSlice => fetchedUser => ', data);
  const user = {
    id: userToken.username,
    role: ['admin'],
    from: 'cognito',
    loginRedirectUrl: '/pages/profile',
    data: {
      ...data.getAthlete,
      displayName: data.getAthlete.firstName,
    },
  };
  console.log('userSlice => fetchedUser => ', user);

  return dispatch(setUserData(user));
};

export const setUserData = (user) => async (dispatch, getState) => {
  console.log('userSlice => setUserData =>', user);
  /*
  You can redirect the logged-in user to a specific route depending on his role
  */
  if (user.loginRedirectUrl) {
    console.log('userSlice => loginRedirectUrl =>', user.loginRedirectUrl);
    settingsConfig.loginRedirectUrl = user.loginRedirectUrl; // for example 'apps/academy'
  }

  /*
  Set User Settings
  */
  dispatch(setDefaultSettings(user.data.settings));

  dispatch(setUser(user));
};

export const updateUserSettings = (settings) => async (dispatch, getState) => {
  const oldUser = getState().auth.user;
  const user = _.merge({}, oldUser, { data: { settings } });

  dispatch(updateUserData(user));

  return dispatch(setUserData(user));
};

export const updateUserShortcuts = (shortcuts) => async (dispatch, getState) => {
  const { user } = getState().auth;
  const newUser = {
    ...user,
    data: {
      ...user.data,
      shortcuts,
    },
  };

  dispatch(updateUserData(newUser));

  return dispatch(setUserData(newUser));
};

export const logoutUser = () => async (dispatch, getState) => {
  const { user } = getState().auth;

  if (!user.role || user.role.length === 0) {
    // is guest
    return null;
  }

  history.push({
    pathname: '/',
  });

  await Auth.signOut();

  dispatch(setInitialSettings());

  return dispatch(userLoggedOut());
};

export const updateUserData = (user) => async (dispatch, getState) => {
  if (!user.role || user.role.length === 0) {
    // is guest
    return;
  }
  dispatch(showMessage({ message: 'User Update not yet implemented.' }));
};

const initialState = {
  role: [], // guest
  data: {
    displayName: 'John Doe',
    photoURL: 'assets/images/avatars/Velazquez.jpg',
    email: 'johndoe@withinpixels.com',
    shortcuts: ['calendar', 'mail', 'contacts', 'todo'],
  },
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
