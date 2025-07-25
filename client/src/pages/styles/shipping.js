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

import { css } from 'lit';

const styles = css`
  h1 {
    color: var(--color-secondary);
    font-size: 2.2em;
  }

  .shippingContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
  }

  .shippingWrapper {
    width: 100%;
  }

  .points {
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--color-primary);
    width: 100%;
    height: 60px;
    z-index: 1000;
    align-items: center;
    display: flex;
  }

  .total-points {
    padding-bottom: 20px;
    padding-left: 20px;
    color: white;
    font-size: 1.5em;
    margin-top: 20px;
  }
`;

export default styles;
