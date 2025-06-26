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
  }

  .contactContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 20px;
  }

  .contactWrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .user-item:nth-child(even) {
    background-color: #f2f2f2; 
  }

  .user-item:nth-child(odd) {
    background-color: #ffffff; 
  }

  .user-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 10px;
  }
  .user-name {
    margin-left: 10px;
    margin-right: auto; /* Push points to the right */
  }

  .user-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    object-fit: cover;
   }
`;

export default styles;
