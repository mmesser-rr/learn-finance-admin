import { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import cognitoService from "app/services/cognitoService";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hideMessage, showMessage } from "app/store/fuse/messageSlice";

import { setUserDataCognito, setUserData, logoutUser } from "./store/userSlice";

class Auth extends Component {
  state = {
    waitAuthCheck: true,
  };

  componentDidMount() {
    return Promise.all([this.cognitoCheck()]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  cognitoCheck = async () =>
    new Promise((resolve) => {
      if (cognitoService.isAuthenticated()) {
        /**
         * Retrieve user data from Cognito
         */
        console.log("Auth => congitoCheck => .");
        cognitoService
          .getUserData()
          .then((tokenData) => {
            // console.log('auth.js => tokenData', tokenData);
            this.props.setUserDataCognito(tokenData);
            resolve();
          })
          .catch((error) => {
            this.props.showMessage({ message: error.message });

            this.setState({ waitAuthCheck: false });
            console.log("Auth => Err", error);
          });
      } else {
        console.log("Auth => right here.");
        resolve();
      }

      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? (
      <FuseSplashScreen />
    ) : (
      <>{this.props.children}</>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logoutUser,
      setUserDataCognito,
      setUserData,
      showMessage,
      hideMessage,
    },
    dispatch
  );
}

Auth.propTypes = {
  children: PropTypes.any,
  setUserDataCognito: PropTypes.func,
  showMessage: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Auth);
