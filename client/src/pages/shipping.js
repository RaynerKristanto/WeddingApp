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
import styles from './styles/shipping.js';

export class Shipping extends LitElement {
  static get styles() {
    return styles;
  }
// changed shipping to missions
  render() {
    return html`
      <div class="shippingContainer">
        <h1>Missions</h1> 
        <div class="shippingWrapper">
          <table>
            <tr>
              <th>Points</th>
              <th style="text-align: left; text-indent: 50px">Mission</th>
            </tr>
            <tr>
              <td>50</td>
              <td>Write message in guest book</td>
            </tr>
            <tr>
              <td>50</td>
              <td>Take a picture using the photo booth</td>
            </tr>
            <tr>
              <td>100</td>
              <td>Find at least X Labubus around the venue</td>
            </tr>
            <tr>
              <td>100</td>
              <td>Join the dance class</td>
            </tr>
            <tr>
              <td>100</td>
              <td>Win rock paper scissors competition</td>
            </tr>
            <tr>
              <td>50</td>
              <td>Introduce yourself to someone you don't know (up to 3 people for 150 points total)</td>
            </tr>
            <tr>
              <td>50</td>
              <td>Get a score of at least 60 on <a href="https://arithmetic.zetamac.com/">https://arithmetic.zetamac.com/</a> with default settings</td>
            </tr>
            <tr>
              <td>100</td>
              <td>Upload or promise to upload media of event to google drive</td>
            </tr>
            <tr>
              <td>25</td>
              <td>Try every food that you want (with menu link)</td>
            </tr>
            <tr>
              <td>100</td>
              <td>Win "last one standing" game</td>
            </tr>
          </table>
        </div>
      </div>
    `;
  }
}

customElements.define('app-shipping', Shipping);
