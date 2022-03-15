import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import auth0Service from 'app/services/auth0Service';
import cognitoService from 'app/services/cognitoService';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { hideMessage, showMessage } from 'app/store/fuse/messageSlice';

import {
  setUserDataCognito,
  setUserDataFirebase,
  setUserDataAuth0,
  setUserData,
  logoutUser,
} from './store/userSlice';

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      // this.firebaseCheck(),
      // this.auth0Check(),
      // this.jwtCheck(),
      this.cognitoCheck(),
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.on('onAutoLogin', () => {
        this.props.showMessage({ message: 'Logging in with JWT' });

        /**
         * Sign in and retrieve user data from Api
         */
        jwtService
          .signInWithToken()
          .then((user) => {
            this.props.setUserData(user);

            resolve();

            this.props.showMessage({ message: 'Logged in with JWT' });
          })
          .catch((error) => {
            this.props.showMessage({ message: error.message });

            resolve();
          });
      });

      jwtService.on('onAutoLogout', (message) => {
        if (message) {
          this.props.showMessage({ message });
        }

        this.props.logout();

        resolve();
      });

      jwtService.on('onNoAccessToken', () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });

  auth0Check = () =>
    new Promise((resolve) => {
      auth0Service.init((success) => {
        if (!success) {
          resolve();
        }
      });

      if (auth0Service.isAuthenticated()) {
        this.props.showMessage({ message: 'Logging in with Auth0' });

        /**
         * Retrieve user data from Auth0
         */
        auth0Service.getUserData().then((tokenData) => {
          this.props.setUserDataAuth0(tokenData);

          resolve();

          this.props.showMessage({ message: 'Logged in with Auth0' });
        });
      } else {
        resolve();
      }

      return Promise.resolve();
    });

  cognitoCheck = async () =>
    new Promise((resolve) => {
      if (cognitoService.isAuthenticated()) {
        this.props.showMessage({ message: 'Logging in with Cognito' });

        /**
         * Retrieve user data from Cognito
         */
        cognitoService.getUserData().then((tokenData) => {
          console.log('auth.js => tokenData', tokenData);
          this.props.setUserDataCognito(tokenData);

          resolve();

          this.props.showMessage({ message: 'Logged in with Cognito' });
        });
      } else {
        resolve();
      }

      return Promise.resolve();
    });

  firebaseCheck = () =>
    new Promise((resolve) => {
      firebaseService.init((success) => {
        if (!success) {
          resolve();
        }
      });

      firebaseService.onAuthStateChanged((authUser) => {
        if (authUser) {
          this.props.showMessage({ message: 'Logging in with Firebase' });

          /**
           * Retrieve user data from Firebase
           */
          firebaseService.getUserData(authUser.uid).then(
            (user) => {
              this.props.setUserDataFirebase(user, authUser);

              resolve();

              this.props.showMessage({ message: 'Logged in with Firebase' });
            },
            (error) => {
              resolve();
            }
          );
        } else {
          resolve();
        }
      });

      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logoutUser,
      setUserDataCognito,
      setUserData,
      setUserDataAuth0,
      setUserDataFirebase,
      showMessage,
      hideMessage,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
