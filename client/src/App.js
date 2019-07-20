import React from 'react';
import './App.scss';
import SignInOAuth from './components/login/oauth';
import Builder from './components/builder/builder';
import SignInTools from './tools/sign-in-tools';
import Instructions from './components/instructions/instructions';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.getBodyContent = this.getBodyContent.bind(this);
  }

  getBodyContent() {
    if(SignInTools.IsUserLoggedIn()) {
      return <Builder />
    } else {
      return <Instructions />
    }
  }

  render() {
    let builder;

    if(SignInTools.IsUserLoggedIn()) {
      builder = <Builder />
    }

    return (
      <main>
        <header>
          <h3>
            artisan wants generator
          </h3>
          <SignInOAuth clientId="94399eee066e2997c7bd"/>
        </header>
        {this.getBodyContent()}
      </main>
    );
  }
}

export default App;