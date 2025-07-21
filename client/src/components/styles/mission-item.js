// Copyright 2023 Google LLC
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
  .mission-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      height: 100px;
      padding: 10px;
      border: 1px solid lightgray;
      border-radius: 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
  }

  .mission-item.complete {
      text-decoration: line-through;
      color: gray;
      opacity: 0.5;
  }
      
  .mission-item input[type="checkbox"] {
      transform: scale(1.2);
  }
  
  .mission-description {
      margin-left: 10px;
      margin-right: auto; 
      font-size: 1.2em;
      width: 235px;
  }
  
  .mission-points { 
      margin-right: 10px;
      font-size: 1.2em;
  }
`;

export default styles;
