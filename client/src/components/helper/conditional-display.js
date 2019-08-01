import React from 'react';
import SignInTools from '../../tools/sign-in-tools';


export const withLoggedIn = (Component) => 
  (props) => 
    SignInTools.IsUserLoggedIn() ?
    <Component {...props} /> :
    null

export const withLoggedInAlternate = (FirstComponent, SecondComponent) => 
    (props) => 
      SignInTools.IsUserLoggedIn() ?
      <FirstComponent {...props} /> :
      <SecondComponent {...props} />