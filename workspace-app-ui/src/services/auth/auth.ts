import * as auth0 from 'auth0-js';
import AUTH_CONFIG from './config';
import { AdfsUserProfile, Auth0DecodedHash, Auth0Error } from 'auth0-js';

class Auth {
    auth0 = new auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      audience: AUTH_CONFIG.audience,
      responseType: 'token id_token',
      scope: 'openid profile email'
    });
  
    // login = (): void => {
    //   this.auth0.authorize();
    // }

    public login = (email: string, password: string, callback: auth0.Auth0Callback<object>, state?: string): void => {
      this.auth0.login({email, password}, callback);
    }
  
    handleAuthentication = (): Promise<string> => {

      return new Promise((resolve, reject) => {
        this.auth0.parseHash((err, authResult: Auth0DecodedHash) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            console.log('authresult: ', authResult);
            resolve(authResult.state);
          } else if (err) {
            console.log(err);
            alert(`Error: ${err.error}. Check the console for further details.`);
            reject();
          }
        });
      });
    }
  
    setSession = (authResult: Auth0DecodedHash): void => {
      if (authResult.expiresIn) {
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('expires_at', expiresAt);
      }
      if (authResult.accessToken) {
        localStorage.setItem('access_token', authResult.accessToken);
      }
      if (authResult.idToken) {
        localStorage.setItem('id_token', authResult.idToken);
      }
    }

    getAccessToken = (): string | null => {
      return localStorage.getItem('access_token');
    }
  
    logout = (): void => {
      // Clear access token and ID token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      // navigate to the home route
    }
  
    isAuthenticated = (): boolean => {
      // Check whether the current time is past the 
      // access token's expiry time
      const time: string | null = localStorage.getItem('expires_at');
      if (time) {
        let expiresAt = JSON.parse(time);
        return new Date().getTime() < expiresAt;
      }
      return false;
    }
  
    getIdToken = (): string | null => {
      const token = localStorage.getItem('id_token');
      return token;
    }
  
    getUserInfo = (): Promise<auth0.AdfsUserProfile> => {
      return new Promise((resolve, reject) => {
        const token: string | null = localStorage.getItem('access_token');
        if (token) {
          this.auth0.client.userInfo(token, (err: Auth0Error, user: AdfsUserProfile) => {
            if (err) {
                reject(err);
            }
            resolve(user);
          });
        }
        reject(new Error('no token saved'));
      });
    }
  }

export default Auth;