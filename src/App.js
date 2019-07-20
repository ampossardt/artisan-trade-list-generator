import React from 'react';
import './App.scss';
import SignInOAuth from './src/components/SignInOAuth';

function App() {

  const onSuccess = () => {
    console.log('success');
  }

  const onFailure = () => {
    console.log('failure');
  }

  return (
    
    <div className="main">
      <SignInOAuth clientId="94399eee066e2997c7bd"/>
    </div>
  );
}

export default App;