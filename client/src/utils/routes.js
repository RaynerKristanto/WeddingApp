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

const routes = [
  {
    name: 'home',
    pattern: '',
  },
  {
    name: 'product-list',
    pattern: 'products',
  },
  {
    name: 'product',
    pattern: 'products/:id',
  },
  {
    name: 'sign-in',
    pattern: 'sign-in',
  },
  {
    name: 'seating-chart',
    pattern: 'seating-chart',
  },
  {
    name: 'shipping',
    pattern: 'shipping',
  },
  {
    name: 'contact',
    pattern: 'contact',
  },
  {
    name: 'scavenger-hunt',
    pattern: 'scavenger-hunt',
  },
  {
    name: 'checkout',
    pattern: 'checkout',
  },
  {
    name: 'not-found',
    pattern: '*',
  },
];

export default routes;
