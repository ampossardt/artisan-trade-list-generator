import constants from './constants';
import SignInTools from './sign-in-tools';

export function saveGist(data) {
  data.username = SignInTools.GetUsername();
  console.log(data);
  
  return fetch(`${constants.apiBaseUrl}/gist`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${SignInTools.GetToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    if(!res.ok) {
      throw new Error('failed to save gist');
    }
  });
}

export function loadGist() {
  return fetch(`${constants.apiBaseUrl}/gist?username=${SignInTools.GetUsername()}`, {
    headers: {
      'Authorization': `token ${SignInTools.GetToken()}`
    }
  }).then(res => {
    if(res.status === 204) {
      return null;
    } else {
      return res.json();
    }
  });
}

export function checkRepository() {
  return fetch(`${constants.apiBaseUrl}/export/check-repo?username=${SignInTools.GetUsername()}`, {
    headers: {
      'Authorization': `token ${SignInTools.GetToken()}`
    }
  }).then(res => {
    if(res.status === 200) {
      return { exists: true };
    } else if(res.status === 404) {
      return { exists: false };
    } else {
      throw new Error('There was a problem checking for the repository.');
    }
  });
}

export function createRepository() {
  return fetch(`${constants.apiBaseUrl}/export/create-repo`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${SignInTools.GetToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: SignInTools.GetUsername()
    })
  }).then(res => {
    if(!res.ok) {
      throw new Error(`There was a problem creating the repository.`);
    } else {
      return { success: true };
    }
  });
}

export function uploadFiles() {
  return fetch(`${constants.apiBaseUrl}/export/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${SignInTools.GetToken()}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: SignInTools.GetUsername()
    })
  }).then(res => {
    if(!res.ok) {
      throw new Error(`There was a problem uploading the files to GitHub.`);
    } else {
      return { success: true };
    }
  });
}