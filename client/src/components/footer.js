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
import styles from './styles/footer.js';
import { getConfig } from '../utils/config.js';
import './link.js';

const sr = new URL('../../assets/srblack.png', import.meta.url).href;
//const flower = 'https://media-api.xogrp.com/images/85d619c9-01cc-4a2f-b0e1-13efd7f21f28~rt_auto-rs_960.h?ordering=explicit';
const flower = 'https://media-api.xogrp.com/images/b06a330a-5234-42df-b019-a721e96349d3~rt_auto-rs_768.h?ordering=explicit';

export class Footer extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    const { VERSION, AVOCANO_PURCHASE_MODE } = getConfig();

    return html`
      <div class="footer">
        <div class="footerWrapper">
          Made with 💜 from the
          <a href="https://github.com/RaynerKristanto/WeddingApp.git">Kristanto's</a>
        </div>
        <div class="version">
          S & R v${VERSION}
        </div>
        <img class="sr" src=${sr} alt="Sr"/>
        <img class="flower" src=${flower} alt="Flower"/>
      </div>
    `;
  }
}

customElements.define('app-footer', Footer);
