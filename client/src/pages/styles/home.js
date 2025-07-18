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
  .homeBase {
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 10px;
    position: relative;
    margin-top: 10px;
  }

  .loading {
    padding: 20px;
  }

  .titleContainer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background-color: transparent;
  }
  
  .bg {
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    z-index: -1; 
    object-fit: cover;
  }
  
   h1 {
    font-family: var(--site-name-font);
    font-size: 35px;
    font-style: italic;
    margin-bottom: 0;
    font-weight: normal;
    color: var(--site-name-color);
  }
  h2 {
    font-family: var(--base-font);
    font-size: 25px;
    color: var(--site-name-color);
    margin-top: 0px;
  }
  .sherray {
    width: 80%;
    border-radius: 50%;
    margin-bottom: 20px;
    transform: scaleX(-1);
  }
`;

export default styles;
