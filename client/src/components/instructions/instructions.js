import React from 'react';
import constants from '../../tools/constants';

class Instructions extends React.Component {
  constructor(props) {
    super(props);

    this.buildUrl = this.buildUrl.bind(this);
  }

  buildUrl() {
    return `https://github.com/login/oauth/authorize?client_id=${constants.githubClientId}&scope=${constants.githubScopes}&redirect_uri=${constants.redirectUri}`;
  }

  render() {
    const url = this.buildUrl('https://artisan-wants-client.herokuapp.com', 'user public_repo gist');

    return (
      <div className="container fixed instructions">
        <h1 className="label">What is this?</h1>
        <div className="section">
          <p>This site was designed to dynamically create a list of 'artisan wants' via an easy-to-use editor, and then upload the results to GitHub to make use of the free github hosting that is provided to account holders.</p>
        </div>
        <h1 className="label">Getting started</h1>
        <div className="flex login-item-container">
          <div className="login-item join">
            <a href="https://github.com/join" className="flex vertical-center"><span>Sign up for a Github Account</span></a>
          </div>
          <div className="login-item existing">
            <a href={url} className="flex vertical-center"><span>Log in to GitHub</span></a>
          </div>
        </div>
      </div>
    );
  }
}

export default Instructions;