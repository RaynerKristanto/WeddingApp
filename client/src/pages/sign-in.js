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
import { navigator } from '../vendor/lit-element-router-2.0.3a/lit-element-router.js';
import { createUser } from '../utils/fetch.js';
import cache from '../utils/cache.js';
import styles from './styles/sign-in.js';
import '../components/product-item.js';

export class SignIn extends navigator(LitElement) {
  constructor() {
    super();
    this.title = 'Sign In';
    this.state = {
      status: 'loading',
    };
    this.firstName = '';
    this.lastName = '';
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

    return html`
      <div class="signInContainer">
        <h1>Sign In</h1>
        <div class="name">
          <label>First Name:</label>
          <input type="text" name="first_name" placeholder:"First Name" required>
        </div>
        <div class="name">
          <label>Last Name:</label>
          <input type="text" name="last_name" placeholder:"Last Name" required>
        </div>
        <mwc-button
          label="Sign In"
          class="dialogButton"
          slot="primaryAction"
          @click="${this.createUserHelper}"
        >
      </div>
    `;
  }
  async createUserHelper() {
    this.firstName = this.shadowRoot.querySelector('input[name="first_name"]').value;
    this.lastName = this.shadowRoot.querySelector('input[name="last_name"]').value;
    const user = await createUser(this.firstName, this.lastName);
    if (user && !user.apiError) {
      // Store the returned user ID in the cache
      await cache.set('userId', user.id);
      // Navigate to the leaderboard page
      this.navigate(`/contact?userId=${user.id}`);
    } else {
      // TODO: Show an error message to the user on the UI
      console.error('Failed to create user:', user?.apiError);
    }
  }
}

customElements.define('app-sign-in', SignIn);
