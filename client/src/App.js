import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';
import SignInOAuth, { LoggedIn } from './components/login/oauth';
import Builder from './components/builder/builder';
import SignInTools from './tools/sign-in-tools';
import Instructions from './components/instructions/instructions';
import Navigation from './components/navigation/navigation';
import ColorSelection from './components/color-selection/colors';
import Export from './components/export/export';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      layout: [],
      colors: {
        backgroundColor: {},
        titleTextColor: {},
        titleBackgroundColor: {},
        subtitleTextColor: {},
        subtitleBackgroundColor: {},
        itemTextColor: {}
      },
      username: '',
      step: 1
    };

    this.configureToast();

    this.getRoutedComponent = this.getRoutedComponent.bind(this);
    this.getBody = this.getBody.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);
    this.initHashChangeListener();
  }

  configureToast() {
    toast.configure({
      autoClose: 3000
    });
  }

  getRoutedComponent() {
    switch(this.state.step) {
      case 1:
        return <Builder 
          sections={this.state.layout}
          saveData={{ colors: this.state.colors, username: this.state.username }}
          onSectionChange={ (layout) => this.setState({ layout }) }
          onDataChange={ (data) => this.setState(data) }
        />;
      case 2:
        return <ColorSelection 
          data={this.state.colors}
          saveData={{ layout: this.state.layout, username: this.state.username }}
          onColorChange={ (colors) => this.setState({ colors }) }
          onDataChange={ (data) => this.setState(data) }
        />
      case 3:
        return <Export
          onUsernameChange={ (username) => this.setState({ username }) }
          saveData={{ layout: this.state.layout, colors: this.state.colors, username: this.state.username }}
          username={this.state.username} />
    }
  }

  getBody() {
    if(SignInTools.IsUserLoggedIn()) {
      return (
        <div className="main-scrollable">
          <Navigation 
            step={this.state.step} />
          { this.getRoutedComponent() }
        </div>
      );
    } else {
      return <Instructions />
    }
  }

  initHashChangeListener() {
    if(SignInTools.IsUserLoggedIn()) {
      window.location.hash = 'step1';
    }
    window.addEventListener("hashchange", this.handleHashChange);
  }

  handleHashChange() {
    const location = window.location.hash.replace(/^#\/?|\/$/g, '');

    this.setState({
      step: parseInt(location.replace('step', ''))
    });
  }

  render() {
    return (
      <main>
        <ToastContainer className='toast-offset' />
        <header>
          <h3>
            Artisan Wants Generator
          </h3>
          <SignInOAuth />
        </header>
        { this.getBody() }
      </main>
    );
  }
  

}

export default App;