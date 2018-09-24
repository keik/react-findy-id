import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css';

import { firebaseConfig } from './config';

export class FindyIdComponent extends Component {

  constructor(props) {
    super(props);
    firebase.initializeApp(firebaseConfig);

    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', this.firebaseUiConfig());
  }

  firebaseUiConfig() {
    const props = this.props;

    return ({
      callbacks: this.firebaseUiCallbacks(props.afterSignInSuccessCallback),
      signInSuccessUrl: props.signInSuccessUrl,
      signInOptions: [
        firebase.auth.GithubAuthProvider.PROVIDER_ID
      ],
      tosUrl: props.tosUrl,
      privacyPolicyUrl: props.privacyPolicyUrl
    });
  }

  firebaseUiCallbacks(afterSignInSuccessCallback) {
    return ({
      signInSuccessWithAuthResult: (authResult) => {
        afterSignInSuccessCallback(authResult);
        return true;
      }
    });
  }

  render() {
    return <div id="firebaseui-auth-container"/>;
  }
}
