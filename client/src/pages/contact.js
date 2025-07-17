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

const noimage = new URL('../../assets/noimage.png', import.meta.url).href;
const users = [
  { points: 250, name: "Clarissa Kristanto", status: "incomplete" },
  { points: 350, name: "Rayner Kristanto", status: "incomplete" },
  { points: 400, name: "Sherry Yao", status: "incomplete" },
  { points: 50, name: "Labubu", status: "incomplete" },
  { points: 25, name: "Cry Baby", status: "incomplete" },
  { points: 150, name: "Lafufu", status: "incomplete" },
  { points: 50, name: "Luffy", status: "incomplete" },
  { points: 200, name: "Miffy", status: "incomplete" },
  { points: 125, name: "Labubu", status: "incomplete" },
  { points: 225, name: "Cry Baby", status: "incomplete" },
];

export class Contact extends LitElement {
  static get properties() {
    return {
      selectedUser: { type: Object, state: true },
    };
  }
  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.title = 'Leaderboard';
    this.users = users.map(u => ({ ...u }));
    this.users.sort((a, b) => b.points - a.points);
    this.selectedUser = this.users[0];
  }

  _selectUser(user) {
    this.selectedUser = user;
  }

  get selectedUserRank() {
    if (!this.selectedUser) return null;
    return this.users.findIndex(u => u === this.selectedUser) + 1;
  }
  render() {
    return html`
      <div class="contactContainer">
        <h1>Leaderboard</h1>
        <div class ="userWrapper">
        ${this.selectedUser
          ? html`
              <div class="user-rank">${this.selectedUserRank}.</div>
              <div class="user-name">${this.selectedUser.name}</div>
              <img class="user-image" src=${noimage} alt="User Image" />
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
              .imageSrc=${noimage}
              .name=${user.name}
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
