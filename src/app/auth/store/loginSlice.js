import { Auth } from 'aws-amplify';
import { createSlice } from '@reduxjs/toolkit';
import { setUserDataCognito } from './userSlice';

export const submitLoginWithCognito =
  ({ userName, password }) =>
  (dispatch) => {
    const response = [];
    Auth.signIn({
      username: userName,
      password,
    })
      .then((user) => {
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
