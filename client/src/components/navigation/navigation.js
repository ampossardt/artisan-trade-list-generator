import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  changeStep(step) {
    window.location.hash = `step${step}`;

    //this.props.onStepChange({ step });
    // this.setState({ step });
  }

  render() {
    return(
      <nav className="progress-navigation">
        <div className="progress-content flex">
          <h3 
            className={(this.props.step <= 3 && 'active') || ''}
            onClick={() => this.changeStep(1)}>
              1. Setup
          </h3>
          <hr className={(this.props.step > 1 && 'active') || ''} />
          <h3 
            className={(this.props.step > 1 && 'active') || ''}
            onClick={() => this.changeStep(2)}>
              2. Colors
          </h3>
          <hr className={(this.props.step === 3 && 'active') || ''}/>
          <h3 
            className={(this.props.step === 3 && 'active') || ''}
            onClick={() => this.changeStep(3)}>
              3. Export
          </h3>
        </div>
      </nav>
    );
  }
}

export default Navigation;