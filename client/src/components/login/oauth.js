import React from 'react'
import { getToken } from '../../tools/request-token';

class SignInOAuth extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      showButton: true
    };

    this.buildUrl = this.buildUrl.bind(this);
  }

  componentDidMount() {
    const pattern = /\?code=(.*)/;
    const code = window.location.href.match(pattern) &&
      window.location.href.match(pattern)[1];

    if(!code) return;

    getToken(code).then(data => {
      const token = data.access_token;
      window.localStorage.setItem('token', token);
      this.setState({ showButton: false });
    });
  }

  buildUrl(clientId, redirectUri, scope) {
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  }
  
  render() {
    const url = this.buildUrl(this.props.clientId, '', 'user public_repo');

    return (
      <a href={url} 
        className={ this.state.showButton ? 'login-button' : 'login-button hide' }>
        Sign in with GitHub
      </a>
    )
  }
}

export default SignInOAuth;