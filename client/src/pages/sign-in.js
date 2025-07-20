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
import { createUser } from '../utils/fetch.js';
import cache from '../utils/cache.js';
import styles from './styles/home.js';
import '../components/product-item.js';

export class SignIn extends LitElement {
  constructor() {
    super();
    this.title = 'Sign In';
    this.state = {
      status: 'loading',
    };
  }

  static get styles() {
    return styles;
  }

  async disconnectedCallback() {
    super.disconnectedCallback();
    cache.deleteDB();
  }

  async firstUpdated() {
    this.state = {
      ...this.state,
      status: 'loaded',
    };


    this.requestUpdate();
  }

  render() {
    const { status } = this.state;



    return html`
      <div class="homeBase">
     <mwc-button
          label="Sign up"
          class="dialogButton"
          slot="primaryAction"
          @click="${this.createUserHelper}"
        >
        ${status === 'loading'
          ? html`<p class="loading">loading... 🥑</p>`
          : html`<div id="firebaseui-auth-container"></div>`}
      </div>
    `;
  }
  async createUserHelper() {
    await createUser("Rayner", "Kristanto");
  }
}

customElements.define('app-sign-in', SignIn);
