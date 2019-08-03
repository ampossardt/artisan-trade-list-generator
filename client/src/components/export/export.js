import React from 'react';
import { ExportBar } from '../bars/bars';
import ProgressTracker from './progress-tracker/progress';
import SignInTools from '../../tools/sign-in-tools';

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
        <ExportBar 
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
        <h2>Then click the export button to begin the export.</h2>
        <ProgressTracker
          start={this.state.startExport}
          saveData={this.props.saveData}
          onExportResult={() => this.handleExportResult() } />
      </div>
    );
  }
}

export default Export;