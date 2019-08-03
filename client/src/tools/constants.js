require('dotenv').config();

const constants = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  githubClientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  githubScopes: process.env.REACT_APP_GITHUB_SCOPES
};

export default constants;