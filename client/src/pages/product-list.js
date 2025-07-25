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
            <h2>Tray-Passed Appetizers</h2>
                <ul>
                  <li> Shiso Honey Prawns</li>
                  <li class="desc">Served with spiced mango sauce<li>
                  <li> Pork Belly Spoons</li>
                  <li class="desc">Served with grilled peach poblano chutney (GF)<li>
          </div>
          <div class="courseContainer">
            <h2>Salad and Bread Service</h2>
                <ul>
                  <li>Salad</li>
                  <li class="desc">Served with (V)<li>
                  <li>Chef's Selection of Macrina Rolls</li>
                  <li class="desc">With a choice of whipped, herbed chive blossom butter, 
                  or roasted garlic butter<li>
          </div>
          <div class="courseContainer">
            <h2>Entrees</h2>
                <ul>
                  <li>Herb-Crusted Sirloin</li>
                  <li class="desc">Served with wild mushroom demi glaze (GF)<li>
                  <li>Citrus Rubbed Salmon</li>
                  <li class="desc">Served with honey lemon coriander sauce (GF)<li>
          </div>
          <div class="courseContainer">
            <h2>Sides</h2>
                <ul>
                  <li>Cilantro Lime Rice</li>
                  <li class="desc">Jasmine rice, cilantro, lime (V, GF)<li>
                  <li>Foraged Mushrooms</li>
                  <li class="desc">PNW wild mushrooms, onions, garlic butter (Veg, GF)<li>
          </div>
          <div class="courseContainer">
            <h2>Taco Bar</h2>
                <ul>
                  <li>Carne Asada</li>
                  <li class="desc">Grilled steak<li>
                  <li>Al Pastor</li>
                  <li class="desc">Spicy pork with pineapple<li>
                  <li>Vegetariano</li>
                  <li class="desc">Veggies (V)<li>
          </div>
          <div class="courseContainer">
            <h2>Dessert</h2>
                <ul>
                  <li>Cake</li>
                  <li class="desc">Oreo, cheese mango, matcha yuzu<li>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-product-list', ProductList);
