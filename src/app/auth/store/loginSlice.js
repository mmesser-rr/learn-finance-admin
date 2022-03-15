import { Auth } from 'aws-amplify';
import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { setUserDataCognito } from './userSlice';

export const submitLogin =
  ({ email, password }) =>
  async (dispatch) => {
    return jwtService
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(setUserDataCognito(user));

        return dispatch(loginSuccess());
      })
      .catch((errors) => {
        return dispatch(loginError(errors));
      });
  };

export const submitLoginWithCognito =
  ({ userName, password }) =>
  (dispatch) => {
    // const debugKey = 'loginSlice => submitLoginWithCognito => ';
    // console.log(`${debugKey} start`);
    const response = [];
    Auth.signIn({
      username: userName,
      password,
    })
      .then((user) => {
        // console.log(`${debugKey} signIn => then => user`, user);

        dispatch(setUserDataCognito(user));
        return dispatch(loginSuccess());
      })
      .catch((err) => {
        response.push({
          type: 'password',
          message: err.message,
        });
        dispatch(loginError(response));
      });

    // We won't confirm yet.
    // Auth.confirmSignIn(userName)
    //   .then(() => {
    //     console.log(`${debugKey} successfully confirmed signed in`);
    //     return dispatch(loginSuccess());
    //   })
    //   .catch((err) => console.log(`${debugKey} Error confirming sign up - ${err}`));
  };

export const submitLoginWithFireBase =
  ({ email, password }) =>
  async (dispatch) => {
    if (!firebaseService.auth) {
      console.warn("Firebase Service didn't initialize, check your configuration");

      return () => false;
    }
    return firebaseService.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        return dispatch(loginSuccess());
      })
      .catch((error) => {
        const emailErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email',
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled',
        ];
        const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];
        const response = [];

        if (emailErrorCodes.includes(error.code)) {
          response.push({
            type: 'email',
            message: error.message,
          });
        }

        if (passwordErrorCodes.includes(error.code)) {
          response.push({
            type: 'password',
            message: error.message,
          });
        }

        if (error.code === 'auth/invalid-api-key') {
          dispatch(showMessage({ message: error.message }));
        }

        return dispatch(loginError(response));
      });
  };

const initialState = {
  success: false,
  errors: [],
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
