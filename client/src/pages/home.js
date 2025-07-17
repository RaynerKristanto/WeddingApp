// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { LitElement, html } from 'lit';
import { getActiveProduct } from '../utils/fetch.js';
import cache from '../utils/cache.js';
import styles from './styles/home.js';
import '../components/product-item.js';
import { getAuth } from "firebase/auth"; 
import { initializeApp } from "firebase/app";

const sherray = new URL('../sherray.webp', import.meta.url).href;

const firebaseConfig = {
  apiKey: "AIzaSyAntDVs4c7i_TPAqFXVhztEJRXd7Xj63u0",
  authDomain: "fair-backbone-447521-d8.firebaseapp.com",

};

export class Home extends LitElement {

  constructor() {
    super();
    this.title = 'Home';
    this.state = {
      status: 'loading',
      productItem: {},
      user: null,
    };
    const app = initializeApp(firebaseConfig);
    this.auth = getAuth();
    this.ui = null;
    console.log("auth" + this.auth);
  }

  static get styles() {
    return styles;
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    cache.deleteDB();
  }

  async firstUpdated() {
    console.log("firstUpdated");

    const productItem = await getActiveProduct();
    this.state = {
      ...this.state,
      status: 'loaded',
      productItem,
    };
    // Observe authentication state changes
    this.unsubscribe = this.auth.onAuthStateChanged((user) => {
      console.log("auth state changed");

      this.state.user = user;
      console.log(this.state)
      this.requestUpdate();
    });

    if (productItem?.apiError) {
      this.state.apiError = productItem.apiError;
    }

    this.requestUpdate();
  }

  updated() {
    if (this.auth && !this.ui) {
      var uiConfig = {
        // Add your configurations
        signInSuccessUrl: '/your-app/dashboard', // URL to redirect after successful sign-in. Replace with your URL!
        signInOptions: [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // Add other providers as needed (Facebook, Twitter, etc.)
        ],
        //Optional:  tosUrl, privacyPolicyUrl, etc for terms of service and privacy policy
      };

      this.ui = new firebaseui.auth.AuthUI(this.auth);
      // if (this.state == 'loaded') {
        // console.log("state is loaded")
        this.ui.start('#firebaseui-auth-container', uiConfig);
      // }
    }
    
  }

  render() {
    console.log("state render: " + this.state.user?.displayName);
    const { status, productItem, apiError, user} = this.state;
    console.log("render");
    if (apiError) {
      return html`<div class="homeBase">
        <p>No active product found. Check <a href="/products">Products</a>.</p>
      </div>`;
    }
    console.log("user render: " + user);
    if (user) {
      console.log("rendering user not null: " + user.displayName);
      return html`
      <div class="homeBase">
        <p class="loading">Welcome, ${user.displayName || user.email}!</p>  <!-- Display user info -->
        <div id="firebaseui-auth-container"></div>
        ${status === 'loading'
          ? html`<p class="loading">loading... 🥑</p>`
          : html`<app-product-item
              .productId="{this.productId}"
              .productItem=${productItem}
            ></app-product-item>`}
      </div>
        `;
    }
    return html`
      <div class="homeBase">
        <div id="firebaseui-auth-container"></div>
        <div class="titleContainer">
          <h1>RAYNER & SHERRY'S</h1>
          <h2>W E D D I N G</h2>
          <img class="sherray" src=${sherray} alt="Sherray"/>
          <h2>-09 01 2025-</h2>
        </div>
      </div>
    `;
  }
}

customElements.define('app-home', Home);
