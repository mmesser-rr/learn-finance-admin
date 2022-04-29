import { Auth } from 'aws-amplify';

class CognitoService {
  signIn = async (username, password) => {
    try {
      const user = await Auth.signIn(username, password);
    } catch (error) {
      console.log('error signing in', error);
    }
  };

  signOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  };

  isAuthenticated = async () => {
    // const u = await Auth.currentAuthenticatedUser();
    // console.log('cognitoService => Auth => u', u);
    const isAuth = Auth.isAuthenticated ?? false;
    console.log('cognitoService => checking authenticated', isAuth);
    return isAuth;
  };

  getUserData = async () => {
    const userData = await Auth.currentAuthenticatedUser();
    console.log('cognitoService => getUserData => ', userData);
    return userData;
  };
}

const instance = new CognitoService();

export default instance;
