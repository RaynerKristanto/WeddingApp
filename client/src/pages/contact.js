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
import { getUserList } from '../utils/fetch.js';
import cache from '../utils/cache.js';


// random images
const images = [
    new URL('../../assets/WeddingPhotos/Rayner/Age1.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age2.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age3.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age4.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age5.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age6.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age7.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age8.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age9.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age10.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age11.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age12.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age13.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age14.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age15.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age16.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age17.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age18.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age19.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Rayner/Age20.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age1.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age2.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age3.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age4.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age5.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age6.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age7.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age8.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age9.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age10.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age11.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age12.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age13.jpg', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age14.JPG', import.meta.url).href,
    new URL('../../assets/WeddingPhotos/Sherry/Age15.jpg', import.meta.url).href, 
    new URL('../../assets/WeddingPhotos/Sherry/Age16.jpg', import.meta.url).href, 
    new URL('../../assets/WeddingPhotos/Sherry/Age17.JPG', import.meta.url).href, 
    new URL('../../assets/WeddingPhotos/Sherry/Age18.JPG', import.meta.url).href, 
    new URL('../../assets/WeddingPhotos/Sherry/Age19.JPG', import.meta.url).href, 
    new URL('../../assets/WeddingPhotos/Sherry/Age20.JPG', import.meta.url).href, 
];

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
    this.userId = null; 
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

      this.users = userList.map(u => ({
        ...u,
        status: 'incomplete',
        image: images[u.id % images.length] // randomly generated images
      }));
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
    console.log("Users is empty, can't update selected user from URL yet.");
    this.selectedUser = null;
    return; // Exit early if users are not loaded
  }

  const params = new URLSearchParams(window.location.search);
  let userId = params.get('userId');

  if (userId) {
    this.userId = parseInt(userId, 10);
  } else {
    this.userId = await cache.get('userId')
  }
    this.selectedUser = this.users.find(u => u.id === this.userId) || null;
    console.log("selectedUser: ", this.selectedUser);
    console.log("userId: ", this.userId);
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
          : html`<p><a href="/sign-in">Sign in</a> to see your stats.</p>`}
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
