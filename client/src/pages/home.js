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
import cache from '../utils/cache.js';
import styles from './styles/home.js';
import { getUserList } from '../utils/fetch.js';
import '../components/product-item.js';

const sherray = new URL('../../assets/sherray.webp', import.meta.url).href;
const bg = new URL('../../assets/wc.png', import.meta.url).href;;

export class Home extends navigator(LitElement) {

  constructor() {
    super();
    this.title = 'Home';
    this.state = {
      status: 'loading',
      user: null,
    };
  }


  static get styles() {
    return styles;
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

  async firstUpdated() {
    await this.loadUserData();
  }

  async handleRouteChange() {
    if (window.location.pathname === '/') {
      await this.loadUserData();
    }
  }

  async loadUserData() {
    const params = new URLSearchParams(window.location.search);
    let userId = params.get('userId');

    if (userId) {
      this.userId = parseInt(userId, 10);
    } else {
      this.userId = await cache.get('userId')
    }

    if (this.userId) {
      const userList = await getUserList();
      if (userList && !userList.apiError) {
        const currentUser = userList.find(u => u.id === this.userId);
        this.state = {
          ...this.state,
          status: 'loaded',
          user: currentUser,
        };
      } else {
        console.error('Could not fetch user list for home page', userList?.apiError);
        this.state = { ...this.state, status: 'loaded', user: null };
      }
    } else {
      this.state = { ...this.state, status: 'loaded', user: null };
    }
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="homeBase">
        <div class="titleContainer">
          <img class="bg" src=${bg} alt="Bg" />
          ${this.state.user
            ? html`<h3>Welcome, ${this.state.user.first_name}</h3>`
            : html`<h3><a href="/sign-in">SIGN IN</a> TO</h3>`}
          <h1>SHERRY & RAYNER'S</h1>
          <h2>W E D D I N G</h2>
          <img class="sherray" src=${sherray} alt="Sherray"/>
          <h2>-09 01 2025-</h2>
        </div>
      </div>
    `;
  }
}

customElements.define('app-home', Home);
