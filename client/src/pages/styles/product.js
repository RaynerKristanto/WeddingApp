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

  .productContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 20px;
  }

  .productWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    max-width: 500px;
    margin: auto;
  }
  
  .courseContainer {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    margin-bottom: 20px;
  }
  
  h2 {
    font-size: 1.3em;
    margin-bottom: 5px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 10px;
  }
  
  .desc {
    font-size: .7em;
    font-style: italic;
    padding-bottom: 5px;
  }
`;

export default styles;
