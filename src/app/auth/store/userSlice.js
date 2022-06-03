/* eslint import/no-extraneous-dependencies: off */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "firebase/compat/auth";
import history from "@history";
import _ from "@lodash";
import {
  setInitialSettings,
  setDefaultSettings,
} from "app/store/fuse/settingsSlice";
import { showMessage } from "app/store/fuse/messageSlice";
import settingsConfig from "app/fuse-configs/settingsConfig";
import { API, Auth, graphqlOperation, Storage } from "aws-amplify";
import { getAthlete } from "graphql/queries";

export const getPhoto = createAsyncThunk(
  "adminApp/Users/getPhoto",
  async (key) => {
    let url;
    try {
      const resp = await Storage.get(key, { download: false, expires: 36 });
      if (resp !== null) {
        url = resp;
      } else {
        url = "";
      }
    } catch (err) {
      console.log("profileSlice => getHeroPhoto => err => ", err);
    }
    return url;
  }
);

export const fetchUserProfile = createAsyncThunk(
  "adminApp/Users/getUserProfile",
  async (params) => {
    let data;
    try {
      const resp = await API.graphql(graphqlOperation(getAthlete, params));
      data = await resp.data;
      return data === undefined ? null : data;
    } catch (err) {
      console.log("userSlice => fetchUserProfile => err => ", err);
    }
    return data;
  }
);

export const setUserDataCognito = (userToken) => async (dispatch) => {
  // Fetch user from db.
  let data;
  try {
    const resp = await API.graphql(
      graphqlOperation(getAthlete, { id: userToken.username })
    );

    data = await resp.data;
  } catch (err) {
    console.log("userSlice => fetchUserProfile => err => ", err);
  }
  // console.log('userSlice => fetchedUser => ', data);
  const user = {
    id: userToken.username,
    role: ["admin"],
    from: "cognito",
    loginRedirectUrl: "/pages/profile",
    data: {
      ...data.getAthlete,
      displayName: data.getAthlete?.firstName ?? "",
    },
  };

  return dispatch(setUserData(user));
};

export const setUserData = (user) => async (dispatch, getState) => {
  /*
  You can redirect the logged-in user to a specific route depending on his role
  */
  if (user.loginRedirectUrl) {
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

export const updateUserShortcuts =
  (shortcuts) => async (dispatch, getState) => {
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
    pathname: "/",
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
  dispatch(showMessage({ message: "User Update not yet implemented." }));
};

const initialState = {
  role: [], // guest
  data: {
    firstName: "",
    displayName: "John Doe",
    photoURL: "assets/images/avatars/Velazquez.jpg",
    email: "johndoe@withinpixels.com",
    shortcuts: ["calendar", "mail", "contacts", "todo"],
  },
};

const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUser: (state, action) => action.payload,
    userLoggedOut: (state, action) => initialState,
  },
  extraReducers: {},
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
