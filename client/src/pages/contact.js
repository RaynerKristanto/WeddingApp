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
import "../components/leaderboard-item.js"
import styles from './styles/contact.js';
import cache from '../utils/cache.js';
import { getUserList } from '../utils/fetch.js';


const noimage = new URL('../../assets/noimage.png', import.meta.url).href;

export class Contact extends navigator(LitElement) {
  static get properties() {
    return {
      selectedUser: { type: Object, state: true },
      users: { type: Array, state: true },
      status: { type: String, state: true },
    };
  }
  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.title = 'Leaderboard';
    this.users = [];
    this.selectedUser = null;
    this.status = 'loading';
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleRouteChange = this.handleRouteChange.bind(this);
    window.addEventListener('route', this.handleRouteChange);
  }

  disconnectedCallback() {
    window.removeEventListener('route', this.handleRouteChange);
    super.disconnectedCallback();
  }

  async handleRouteChange() {
    // Re-fetch data if we are navigating to the contact page.
    if (window.location.pathname === '/contact') {
      await this.loadData();
    }
  }

  async firstUpdated() {
    await this.loadData();
  }

  async loadData() {
    this.status = 'loading';
    this.requestUpdate();

    let userList = await getUserList();

    if (userList && !userList.apiError) {
      const newUser = await cache.get('newUser');
      // If a new user was just created and isn't in the list from the API
      // (due to replication lag), add them to the list manually.
      if (newUser && !userList.find(u => u.id === newUser.id)) {
        userList.push(newUser);
        // This is a one-time operation, so remove it from cache.
        await cache.del('newUser');
      }

      this.users = userList.map(u => ({ ...u, status: 'incomplete' }));
      this.users.sort((a, b) => (b.points || 0) - (a.points || 0));
      await this._updateSelectedUserFromURL();
    } else {
      console.error(
        'Could not fetch user list for leaderboard',
        userList?.apiError
      );
    }
    this.status = 'loaded';
    this.requestUpdate();
  }

  async _updateSelectedUserFromURL() {
    if (this.users.length === 0) {
      this.selectedUser = null;
      return;
    }

    const params = new URLSearchParams(window.location.search);
    let userId = params.get('userId');

    if (userId) {
      this.selectedUser = this.users.find(u => u.id === parseInt(userId, 10)) || null;
    } else {
      const cachedUserId = await cache.get('userId');
      if (cachedUserId) {
        this.selectedUser = this.users.find(u => u.id === cachedUserId) || null;
      } else {
        // If no user is signed in, selectedUser will be null.
        this.selectedUser = null;
      }
    }
  }

  get selectedUserRank() {
    if (!this.selectedUser) return null;
    return this.users.findIndex(u => u.id === this.selectedUser.id) + 1;
  }

  render() {
    if (this.status === 'loading') {
      return html`<div class="contactContainer">
        <h1>Leaderboard</h1>
        <app-loading></app-loading>
      </div>`;
    }

    if (this.users.length === 0) {
      return html`<div class="contactContainer">
        <h1>Leaderboard</h1>
        <p>Leaderboard is empty.</p>
      </div>`;
    }
    return html`
      <div class="contactContainer">
        <h1>Leaderboard</h1>
        <div class ="userWrapper">
        ${this.selectedUser
          ? html`
              <div class="user-rank">${this.selectedUserRank}.</div>
              <div class="user-name">${this.selectedUser.first_name} ${this.selectedUser.last_name}</div>
              <img class="user-image" src=${this.selectedUser.image || noimage} alt="User Image" />
              <div class="user-points">
                ${this.selectedUser.points} Points
              </div>
            `
          : html`<p>Sign in to see your stats.</p>`}
        </div>
        <div class="contactWrapper">
          ${this.users.map((user, index) => html`
            <leaderboard-item
              .rank=${index + 1}
              .imageSrc=${user.image || noimage}
              .name=${`${user.first_name} ${user.last_name}`}
              .points=${user.points}
            ></leaderboard-item>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('app-contact', Contact);
