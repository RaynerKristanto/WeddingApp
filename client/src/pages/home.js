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
import cache from '../utils/cache.js';
import styles from './styles/home.js';
import '../components/product-item.js';

const sherray = new URL('../../assets/sherray.webp', import.meta.url).href;
const bg = new URL('../../assets/wc.png', import.meta.url).href;;

export class Home extends LitElement {

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

  async disconnectedCallback() {
    super.disconnectedCallback();
    cache.deleteDB();
  }

  render() {
    return html`
      <div class="homeBase">
        <div class="titleContainer">
          <img class="bg" src=${bg} alt="Bg"/>
          <h3><a href="/sign-in">SIGN IN</a> TO</h3>
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
