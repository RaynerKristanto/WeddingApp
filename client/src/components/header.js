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
import styles from './styles/header.js';
import './link.js';

const sr = new URL('../srblack.png', import.meta.url).href;
const flower = 'https://media-api.xogrp.com/images/3f0b385e-b7b2-4840-8a59-38ca55bca221~rt_auto-rs_960.h?ordering=explicit';

export class Header extends LitElement {
  static get properties() {
    return {
      headerTitle: { type: String },
      menuOpen: { type: Boolean }
    };
  }

  constructor() {
    super();
    this.menuOpen = false;
  }

  static get styles() {
    return styles;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenuOnClick(e) {
    // Optionally check if the click was on a menu link to be safe
    // For example, if app-link dispatches a click event, this will catch it
    this.menuOpen = false;
  }

  render() {
    document.title = this.headerTitle;
// changed shipping to Missions
    return html`
      <div class="header">
        <img class="flower" src=${flower} alt="Flower"/>
        <a href="/">
          <img class="sr" src=${sr} alt="Sr"/>
        </a>
      </div>
      <div class="navigationBar">
        <div class="topnav">
          <a class="icon" @click=${this.toggleMenu}>
            <span style="font-size: 30px;">☰</span>
          </a>
        </div>
        <div id="myLinks" 
          style="display: ${this.menuOpen ? 'block' : 'none'};" 
          @click=${this.closeMenuOnClick}>
            <app-link href="/products">Menu</app-link>
            <app-link href="/shipping">Missions</app-link>
            <app-link href="/contact">Leaderboard</app-link>
            <app-link href="/sign-in">Sign In</app-link>
        </div>
      </div>
    `;
  }
}

customElements.define('app-header', Header);
