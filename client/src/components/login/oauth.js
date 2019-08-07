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
      loading: true,
      menuOpen: false
    };

    this.registerClickListener();
  }

  componentDidMount() {
    getUserInfo().then(data => {
      this.setState({ data, loading: false });
      window.localStorage.setItem('username', data.login);
    });
  }

  logout() {
    window.localStorage.clear();
    window.location.hash = '';
    window.location.reload();
  }

  registerClickListener() {
    document.addEventListener('click', () => {
      this.setState({ menuOpen: false });
    });
  }

  render() {
    const { avatar_url, login } = this.state.data;

    return (
      <figure 
        className={`user-info flex vertical-center ${this.state.menuOpen && 'active'}`}
        onClick={() => this.setState({ menuOpen: !this.state.menuOpen })}>
        { !this.state.loading && <i className={`fa ${this.state.menuOpen ? 'fa-chevron-up': 'fa-chevron-down'}`}></i> }
        <div className="name">
          <p className={this.state.loading ? 'placeholder': ''}>
            { !this.state.loading && login }
          </p>
        </div>
        <div 
          className={`image ${this.state.loading ? 'loading': ''}`} 
          style={{backgroundImage: `url('${avatar_url}')`}}>
        </div>
        <div className={`menu ${this.state.menuOpen && 'open'}`}>
          <button onClick={() => this.logout()}>Log out</button>
        </div>
      </figure>
    );
  }
}

export default SignInOAuth;