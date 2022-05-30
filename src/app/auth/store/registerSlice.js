import { Auth } from 'aws-amplify';
import { createSlice } from '@reduxjs/toolkit';

export const registerWithCognito = (model) => async (dispatch) => {
  const debugKey = 'registerSlice => registerWithCognito => ';
  console.log(`${debugKey} start`);
  console.log(`${debugKey}`, model);

  const { email, password, userName } = model;
  Auth.signUp({
    username: userName,
    password,
    attributes: {
      email,
      phone_number: userName,
    },
  })
    .then(() => {
      console.log(`${debugKey} Successfully signed up`);
    })
    .catch((err) => console.log(`${debugKey} e => ${err}`));
};

const initialState = {
  success: false,
  errors: [],
};

const registerSlice = createSlice({
  name: 'auth/register',
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    registerError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
