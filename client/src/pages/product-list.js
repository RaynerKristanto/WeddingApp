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
import { getProductList } from '../utils/fetch.js';
import styles from './styles/product.js';

export class ProductList extends navigator(LitElement) {
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

    let products = await getProductList();

    this.state = {
      status: 'loaded',
      products,
    };

    if (this.state.status === 'loaded') {
      this.requestUpdate();
    }
  }
  // need to choose salad, dessert, tacos
  render() {
    return html`
      <div class="productContainer">
        <h1 class="productTitle">Menu</h1>
        <div class="productWrapper">
                    <div class="courseContainer">
            <h2>Appetizers</h2>
                <ul>
                  <li>Crab Fish Maw Soup</li>
                  <li>Golden Crab Claws</li>
                </ul>
          </div>
          <div class="courseContainer">
            <h2>Entrees</h2>
                <ul>
                  <li>Peking Duck</li>
                  <li>Ginger Scallion Lobsters</li>
                  <li>Shiitake Mushrooms with Chinese Broccoli</li>
                  <li>Seafood Bird's Nest</li>
                  <li>Tenderloin Steak and Tofu</li>
                  <li>Crispy Fried Sole Fish</li>
                  <li>Seafood Fried Rice</li>
                </ul>
          </div>
          <div class="courseContainer">
            <h2>Dessert</h2>
                <ul>
                  <li>Sesame Balls</li>
                  <li>Cake</li>
                </ul>
          </div>
          <div class="courseContainer">
            <h2>Boba Bar</h2>
                <ul>
                  <li>Oolong Milk Tea</li>
                  <li>Lychee Matcha Milk Tea</li>
                </ul>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-product-list', ProductList);
