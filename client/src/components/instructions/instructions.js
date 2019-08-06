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
    const url = this.buildUrl();

    return (
      <div className="container fixed instructions">
        <h1 className="heading">Get started:</h1>
        <div className="login-item-container">
          <div className="login-item existing">
            <a href={url} className="flex vertical-center"><span>Log in via GitHub</span></a>
          </div>
          <span class="create-account">No account? <a href="https://github.com/join" target="_blank" rel="noopener noreferrer">Create one</a></span>
        </div>
        <h1 className="label">What is this?</h1>
        <div className="section">
          <p>Tired of using Google Docs as a way to manage the list of artisans you are looking for? Wishing there was a more mobile-friendly way to display said list? Use my site to generate a nicely-formatted, mobile-friendly list of artisans with the colors of your choice!</p>
          <p><br/><a className="button turquoise" target="_blank" rel="noopener noreferrer" href="https://github.com/ampossardt/artisan-trade-list-generator">See the full README on GitHub</a></p>
        </div>
        <h1 className="label">How do I use it?</h1>
        <div className="section">
          <h2>Log in via GitHub</h2>
          <p>This app needs permission to use your GitHub account. Once your account is linked, you can start building out your template.</p>
          <h2>Build your layout</h2>
          <p>Add sections, subsections, and items for each artisan maker, sculpt and colorway, respectively, that you'd like to display on your list.</p>
          <h2>Select colors</h2>
          <p>Choose colors for each section of your list.</p>
          <h2>Export</h2>
          <p>Enter your reddit username (for display purposes), then click 'Export', and your list will be generated and uploaded to your GitHub Pages URL: <strong>(your github username).github.io</strong></p>
        </div>
      </div>
    );
  }
}

export default Instructions;