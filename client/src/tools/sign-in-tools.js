class SignInTools {
  static IsUserLoggedIn = () => {
    const token = window.localStorage.getItem('token');

    return !!token;
  }

  static GetToken = () => {
    return window.localStorage.getItem('token');
  }
}

export default SignInTools;