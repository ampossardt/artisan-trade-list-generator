import React from 'react'
import { getToken, getUserInfo } from '../../tools/request-token';
import SignInTools from '../../tools/sign-in-tools';

class SignInOAuth extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const pattern = /\?code=(.*)/;
    const code = window.location.href.match(pattern) &&
      window.location.href.match(pattern)[1];

    if(code && !SignInTools.IsUserLoggedIn()) {
      getToken(code).then(data => {
        const token = data.access_token;
        window.localStorage.setItem('token', token);

        if(window.history.replaceState) {
          const location = window.location.toString();
          window.history.replaceState({}, document.title, location.substring(0, location.indexOf('?')));
          window.location.hash = 'step1';
          this.setState({});
        } else {
          window.location = '/';
        }
      });
    }
  }

  render() {
    return(
      SignInTools.IsUserLoggedIn() ? 
      <LoggedIn /> :
      null
    );
  }
}

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      loading: true
    };

    this.getComponent = this.getComponent.bind(this);
  }

  componentDidMount() {
    getUserInfo().then(data => {
      console.log(data);
      this.setState({ data, loading: false });
      window.localStorage.setItem('username', data.login);
    });
  }

  getComponent() {
    const { avatar_url, email, login } = this.state.data;

    return this.state.loading ?
      <div className="loader"><i className="fa fa-spinner"></i></div> :
      <figure className="user-info flex vertical-center">
        <img src={avatar_url} />
        <div className="name">
          <p>{login}</p>
          <p>{email}</p>
        </div>
        <LogOutButton />
      </figure>; 
  }

  render() {
    return(
      this.getComponent()
    );
  }
}

class LogOutButton extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    window.localStorage.clear();
    window.location.hash = '';
    window.location.reload();
  }

  render() {
    return (
      <span className="title"
        onClick={() => this.logout() }>
        <i className="fa fa-sign-out"></i> Log out
      </span>
    );
  }
}

export default SignInOAuth;