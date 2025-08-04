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

const sr = new URL('../../assets/srblack.png', import.meta.url).href;
const flower = 'https://media-api.xogrp.com/images/3f0b385e-b7b2-4840-8a59-38ca55bca221~rt_auto-rs_960.h?ordering=explicit';
const wisteria = 'https://media-api.xogrp.com/images/c8ec293b-ed14-4e3d-b6a6-8ca57d09ee5d~rt_auto-rs_768.h?ordering=explicit';

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
    const hamburgerIcon = this.shadowRoot.querySelector('.css-prysaa');
    hamburgerIcon.classList.toggle('open');
  }


  closeMenuOnClick(e) {
    // Optionally check if the click was on a menu link to be safe
    // For example, if app-link dispatches a click event, this will catch it
    this.menuOpen = false;
    const hamburgerIcon = this.shadowRoot.querySelector('.css-prysaa');
    hamburgerIcon.classList.remove('open');
  }

  render() {
    document.title = this.headerTitle;
// changed shipping to Missions
    return html`
      <div class="header">
        <img class="flower" src=${wisteria} alt="Flower"/>
        <a href="/">
          <img class="sr" src=${sr} alt="Sr"/>
        </a>
      </div>
      <div class="navigationBar">
        <div class="topnav">
          <button data-testid="MobileNav__Button" class="css-59byx" @click=${this.toggleMenu}>
            <div data-testid="HamburgerIcon" class="css-prysaa">
              <span class="css-nety4p"></span>
              <span class="css-v4to9h"></span>
              <span class="css-1cwt296"></span>
              <span class="css-1lxkrq8"></span>
            </div>
            <span class="css-1wkn33">Menu Button</span>
          </button>
        </div>
        <div id="myLinks"  
          @click=${this.closeMenuOnClick}
          class="${this.menuOpen ? 'show' : ''}">
          <div class="linksContainer">
            <app-link href="/" class="${window.location.pathname === '/' ? 'active' : ''}">Home</app-link>
            <app-link href="/products" class="${window.location.pathname === '/products' ? 'active' : ''}">Menu</app-link>
            <app-link href="/seating-chart" class="${window.location.pathname === '/seating-chart' ? 'active' : ''}">Seating Chart</app-link>
            <app-link href="/shipping" class="${window.location.pathname === '/shipping' ? 'active' : ''}">Missions</app-link>
            <app-link href="/contact" class="${window.location.pathname === '/contact' ? 'active' : ''}">Leaderboard</app-link>
            <app-link href="/scavenger-hunt" class="${window.location.pathname === '/scavenger-hunt' ? 'active' : ''}">Scavenger Hunt</app-link>
          </div>
         </div>
      </div>
    `;
  }
}

customElements.define('app-header', Header);
