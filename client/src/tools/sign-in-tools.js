class SignInTools {
  static IsUserLoggedIn = () => {
    const token = window.localStorage.getItem('token');

    return !!token;
  }

  static GetToken = () => {
    return window.localStorage.getItem('token');
  }

  static GetUsername = () => {
    return window.localStorage.getItem('username');
  }
}

export default SignInTools;