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
import "../components/leaderboard-item.js"
import styles from './styles/contact.js';
import { getUserList } from '../utils/fetch.js';


const noimage = new URL('../../assets/noimage.png', import.meta.url).href;

export class Contact extends LitElement {
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

  async firstUpdated() {
    const userList = await getUserList();
    // Assuming getUserList returns an array of users with name and points
    if (userList && !userList.apiError) {
      this.users = userList.map(u => ({ ...u, status: 'incomplete' }));
      this.users.sort((a, b) => (b.points || 0) - (a.points || 0));
      this.selectedUser = this.users[0] || null;
    } else {
      console.error(
        'Could not fetch user list for leaderboard',
        userList?.apiError
      );
    }
    this.status = 'loaded';
  }

  _selectUser(user) {
    this.selectedUser = user;
  }

  get selectedUserRank() {
    if (!this.selectedUser) return null;
    return this.users.findIndex(u => u === this.selectedUser) + 1;
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
          : html`<p>Select a player to see their stats.</p>`}
        </div>
        <div class="contactWrapper">
          ${this.users.map((user, index) => html`
            <leaderboard-item
              .rank=${index + 1}
              .imageSrc=${user.image || noimage}
              .name=${`${user.first_name} ${user.last_name}`}
              .points=${user.points}
              @click=${() => this._selectUser(user)}
              style="cursor: pointer;"
            ></leaderboard-item>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('app-contact', Contact);
