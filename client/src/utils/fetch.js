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

import { getConfig } from '../utils/config.js';
import { getDjangoError } from '../helpers/fetch.js';

const baseRequest = {
  credentials: 'include',
};

const _getAPI = async uri => {
  const { API_URL } = getConfig();

  let url = `${API_URL}/${uri}`;
  let apiError = { url: url };
  let response, data;

  try {
    response = await fetch(url, {
      method: 'GET',
      ...baseRequest,
    });
    data = await response.clone().json();
  } catch (error) {
    console.error(error);

    apiError.error = error.toString();

    // Based on common reasons for failure cases, make nicer messages

    // Network Errors
    if (error instanceof TypeError && error.message == 'Failed to fetch') {
      apiError.message = `The API didn't respond. Is the API server up?`;

      // Django Errors
    } else if (
      error instanceof SyntaxError &&
      error.message.includes('is not valid JSON')
    ) {
      apiError.message = `The server returned invalid JSON. Is Django returning an error?`;
      apiError.error = `Error: "${response.statusText}"`;
      apiError.extra_error = getDjangoError(await response.text());

      // Fallback Error
    } else {
      apiError.message = `Request encountered an error: ${error.name}`;
    }
    return { apiError };
  }

  // Capture not OK responses
  if (!response?.ok) {
    apiError.message = await response?.text();
    apiError.error = `Server returned ${response?.status} - ${response?.statusText}`;
    return { apiError };
  }

  return data;
};

export const getProduct = async productId => {
  return _getAPI(`products/${productId}`);
};

export const getActiveProduct = async () => {
  return _getAPI('active/product/');
};

export const createUser = async (firstName, lastName) => {
  let uri = "users/"
  const { API_URL } = getConfig();

  let url = `${API_URL}/${uri}`;
  let response;
  try {
    const token = await _getAPI('csrf_token');
    const payload = {
      first_name: firstName,
      last_name: lastName,
      points: 0,
    };
    response = await fetch(url, {
      method: 'POST',
      headers: { 'X-CSRFToken': token.csrfToken, 
        'Accept': 'application/json',
        'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      ...baseRequest,
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => response.text());
      return { apiError: { message: 'Failed to create user', error: errorData } };
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    return { apiError: { message: 'Error creating user', error: error.toString() } };
  }
};
export const updateMissionStatus = async (userId, missionId, completed) => {
  const uri = 'missions/update-status/';
  const { API_URL } = getConfig();
  const url = `${API_URL}/${uri}`;

  try {
    const token = await _getAPI('csrf_token');
    const payload = {
      user_id: userId,
      mission_id: missionId,
      completed: completed,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRFToken': token.csrfToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      ...baseRequest,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => response.text());
      console.error('Failed to update mission status:', errorData);
      return {
        apiError: {
          message: 'Failed to update mission status',
          error: errorData,
        },
      };
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating mission status:', error);
    return { apiError: { message: 'Error updating mission status', error: error.toString() } };
  }
};

export const buyProduct = async (productId, callback) => {
  let uri = `products/${productId}/purchase/`;
  const { API_URL } = getConfig();

  let url = `${API_URL}/${uri}`;
  try {
    const token = await _getAPI('csrf_token');

    await fetch(url, {
      method: 'POST',
      headers: { 'X-CSRFToken': token.csrfToken },
      ...baseRequest,
    });
    callback && callback(); // callbacks handle error message parsing directly.
  } catch (error) {
    console.error(error);
  }
};

export const getProductTestimonials = async productId => {
  if (productId) {
    return _getAPI(`testimonials/?product_id=${productId}`);
  } else {
    let errorMessage = 'productId required';
    console.log(errorMessage);
    return [{ message: errorMessage }];
  }
};

export const getProductList = async () => {
  return _getAPI(`products/`);
};

export const getUserList = async () => {
  return _getAPI(`users/`);
}

export const getMissionsForUser = async userId => {
  if (!userId) {
    const errorMessage = 'A userId is required to get missions.';
    console.error(errorMessage);
    return { apiError: { message: errorMessage } };
  }
  return _getAPI(`missions/getMissionsForUsers/?user_id=${userId}`);
};

export const getSiteConfig = async () => {
  return _getAPI('active/site_config');
};

export const checkout = async payload => {
  const { API_URL } = getConfig();
  let checkoutStatus;
  let errors;

  if (payload?.items?.length) {
    try {
      // Retrieve csrf token from server
      const token = await _getAPI('csrf_token');

      // Submit form payload and pass back csrf token
      const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: { 'X-CSRFToken': token.csrfToken },
        body: JSON.stringify(payload),
        ...baseRequest,
      });
      checkoutStatus = await response.json();
    } catch (error) {
      errors = [error];
    }
  } else {
    errors = [{ message: 'Insufficient information to process checkout.' }];
  }

  if (errors) {
    console.error(errors);
    checkoutStatus = { errors };
  }

  return checkoutStatus;
};
