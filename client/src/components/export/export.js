import React from 'react';
import { TitleBar } from '../bars/bars';
import ProgressTracker from './progress-tracker/progress';
import { Button } from '../generic';

class Export extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startExport: false
    };

    this.handleExportResult = this.handleExportResult.bind(this);
  }

  handleExportResult() {
    this.setState({ startExport: false });
  }

  render() {
    return(
      <div className="container step-container animate">
        <TitleBar 
          title='Step 3: Export'
          onExport={() => this.setState({ startExport: true }) }
          showSave={this.props.username}
        />
        <h2>Almost done...</h2>
        <h2>Enter your reddit username:</h2>
        <div className="centered-input">
          <span className='icon'>
              u/
          </span>
          <input 
            className='primary' 
            type='text' 
            value={this.props.username} 
            onChange={(event) => this.props.onUsernameChange(event.target.value)}
            placeholder='username'
          />
        </div>
        <div className="flex">
          <Button
            className={'button github center no-hover'}
            onClick={() => this.setState({ startExport: true })}
            children={'Export to GitHub'}
            disabled={!this.props.username}
            hideLoader={true}
          />
        </div>
        <ProgressTracker
          start={this.state.startExport}
          saveData={this.props.saveData}
          onExportResult={() => this.handleExportResult() } />
      </div>
    );
  }
}

export default Export;