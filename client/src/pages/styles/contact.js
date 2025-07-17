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
    font-size: 2.5em;
  }
    

  .userWrapper {
    background-color: var(--color-primary);
    padding: 20px;
    margin-bottom: 30px;
    width: 95%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 10px;
    position: sticky;
    top: 10px;
    z-index: 1;
  }

  .user-name {
    font-size: 1.6em;
    margin-left: 10px;
    margin-right: auto;
    width: 120px;
    color: white;
  }

  .user-image {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    object-fit: cover;
  }

  .user-rank {
    font-size: 2em;
    font-weight: bold;
    color: var(--site-name-color);
    margin: 5px 0;
    width: 20px; 
    text-align: right;
  }

  .user-points {
    font-size: 1.6em;
    margin-right: 10px;
    margin-left: auto;
    width: 120px; 
    text-align: right; 
    color: white;
  }
  .contactContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
  }

  .contactWrapper {
    width: 100%;
  }
`;

export default styles;
