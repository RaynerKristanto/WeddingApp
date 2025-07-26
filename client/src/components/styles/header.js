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
    margin-bottom: -130px;
    transform: scaleX(-1);
    margin-top: -15px;
    z-index: -1;
  }

  .sr {
    height: 100px;
    width: auto;
  }

  .navigationBar {
    position: relative;
  }

  .topnav {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 35px;
    padding: 0 5px;
    position: relative;
    margin-bottom: 0px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: inherit;
    line-height: inherit;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }

  [role=button],button {
      cursor: pointer
  }

  .css-59byx {
    background: none;
    border: none;
    font-size: 10px;
    height: 40px;
    width: 40px;
    border-radius: 3px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .css-prysaa {
    width: 24px;
    height: 24px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: 0.5s ease-in-out;
  }
  
  .css-nety4p {
    display: block;
    position: absolute;
    height: 1.5px;
    width: 100%;
    background: #000;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    top: 4px;
  }

  .css-v4to9h {
    display: block;
    position: absolute;
    height: 1.5px;
    width: 100%;
    background: #000;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    top: 12px;
  }

  .css-1cwt296 {
    display: block;
    position: absolute;
    height: 1.5px;
    width: 100%;
    background: #000;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    top: 12px;
  }

  .css-1lxkrq8 {
    display: block;
    position: absolute;
    height: 1.5px;
    width: 100%;
    background: #000;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    top: 20px;
  }

  .css-1wkn33 {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  
  .css-prysaa.open .css-nety4p {
    width: 0%;
    height: 0px;
    top: 12px;
    left: 50%;
  }

  .css-prysaa.open .css-v4to9h {
    transform: rotate(45deg) translate(-0, 0);
  }

  .css-prysaa.open .css-1cwt296 {
    transform: rotate(-45deg);
  }

  .css-prysaa.open .css-1lxkrq8 {
    width: 0%;
    height: 0px;
    top: 12px;
    left: 50%;
  }

   #myLinks {
    position: absolute;
    top: 100%;      
    left: 0;       
    width: 100%;   
    background: white;
    margin: 0
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    display: none;
    z-index: 5;
    display: block;
    box-sizing: border-box;
    transition: max-height 0.5s ease-out;
    max-height: 0;
    overflow: hidden;
  }

  #myLinks.show {
    max-height: 500px;
    transition: max-height 0.5s ease-in;
  }

  app-link {
    display: block;
    margin: 0.5em 0;
    font-size: 20px;
    -webkit-tap-highlight-color: transparent;
  }
  
  app-link.active {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 6px;
  }

  .linksContainer {
    padding: 1em;
  }
  `;

export default styles;
