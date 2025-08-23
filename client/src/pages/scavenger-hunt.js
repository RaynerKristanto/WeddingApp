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
import styles from './styles/scavenger-hunt.js';


export class ScavengerHunt extends navigator(LitElement) {
  static get styles() {
    return styles;
  }

  constructor() {
    super();
    this.title = 'Product List';
    this.state = {
      status: 'loading',
      products: [],
    };
  }

  async firstUpdated(changed) {
    super.firstUpdated(changed);

    this.state = {
      status: 'loaded',
    };

    if (this.state.status === 'loaded') {
      this.requestUpdate();
    }
  }
  // need to choose salad, dessert, tacos
  render() {
    return html`
      <div class="productContainer">
        <h1>Scavenger Hunt</h1>
        <div class="productWrapper">
          <div class="riddleContainer">
            <div class="number">1</div>
                <div class="riddle">
                  Catch me if you can — I’m fast and bright, golden and small, a true seeker’s delight.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">2</div>
                <div class="riddle">
                  Misspelled and squashed, but made with care, find the sweet start of Harry's magical affair.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">3</div>
                <div class="riddle">
                  Snowy white and wise, this loyal friend flies. Find the messenger who through night skies flies.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">4</div>
                <div class="riddle">
                  Blank pages hide dark secrets within. Find the book where Riddle's memories begin.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">5</div>
                <div class="riddle">
                  Not what you are, but what you crave — Find the glass that doesn’t behave.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">6</div>
                <div class="riddle">
                  Where do you belong? Find the wise hat that sorts, and learn which house is your strongest fort.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">7</div>
                <div class="riddle">
                  To save the day, turn back the hour. Find the golden hourglass and regain lost power.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">8</div>
                <div class="riddle">
                  Mischief managed, but only when you find this map that shows all paths and secrets hidden from plain sight.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">9</div>
                <div class="riddle">
                  Seek out Luna’s quirky gift, hidden well for you to find. Put these on, and creatures of the unseen will show their kind.
                </div>
          </div>
          <div class="riddleContainer">
            <div class="number">10</div>
                <div class="riddle">
                  Shiny and small, I just can't resist — Check where coins or trinkets might exist.
                </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-scavenger-hunt', ScavengerHunt);