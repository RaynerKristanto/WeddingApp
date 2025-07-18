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
  :host {
    font-family: var(--base-font), sans-serif;
    width: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 2em;
    margin-bottom: -40px;
  }

  .flower {
    width: 122%;
    margin-bottom: -120px;
  }
  
  h2 {
    font-family: var(--base-font);
    font-size: 25px;
    color: var(--site-name-color);
    margin-top: 0px;
  }

  .navigationBar {
    position: relative;
  }

  .topnav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    padding: 0 1em;
    position: relative;
    margin-bottom: 0px;
  }

  .icon {
    height: 45px;
    font-size: 30px;
    color: var(--site-name-color);
    cursor: pointer;
    z-index: 10;   
  }

  .sr {
    height: 75px;
    width: auto;
  }

   #myLinks {
    position: absolute;
    top: 100%;      
    left: 0;       
    width: 100%;   
    background: white;
    padding: 1em;
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    display: none;
    z-index: 5;
    box-sizing: border-box;
  }

    #myLinks.show {
      display: block;
    }

    app-link {
      display: block;
      margin: 0.5em 0;
      font-size: 20px;
    }
  `;

export default styles;
