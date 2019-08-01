import SignInTools from './sign-in-tools';
import constants from './constants';

export function getToken(code) {
  return fetch(`${constants.apiBaseUrl}/getaccesstoken`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: code
    })
  })
  .then(data => data.json());
}

export function getUserInfo() {
  return fetch(`${constants.apiBaseUrl}/user`, {
    method: 'GET',
    headers: {
      'Authorization': `token ${SignInTools.GetToken()}`
    }
  })
  .then(data => data.json());
}