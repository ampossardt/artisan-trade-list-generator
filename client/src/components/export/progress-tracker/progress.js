import React from 'react';
import { saveGist, checkRepository, createRepository, uploadFiles } from '../../../tools/api';
import SignInTools from '../../../tools/sign-in-tools';

class ProgressTracker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'Ready',
      icon: 'ready',
      started: false,
      showLink: false
    };

    this.startExport = this.startExport.bind(this);
    this.saveGistStep = this.saveGistStep.bind(this);
    this.checkRepoStep = this.checkRepoStep.bind(this);
    this.createRepoStep = this.createRepoStep.bind(this);
    this.uploadFilesStep = this.uploadFilesStep.bind(this);
  }

  componentDidUpdate() {
    if(this.props.start && !this.state.started) {

      this.setState({ started: true, showLink: false, status: 'Saving progress...', icon: 'loading' });
      this.startExport();
    }
  }

  startExport() {
    this.saveGistStep()
      .catch(error => {
        this.props.onExportResult();
        this.setState({ status: error.message, icon: 'error', started: false });
      });
  }

  saveGistStep() {
    return saveGist({ data: this.props.saveData })
      .then(data => {
        this.setState({ status: 'Checking for repostory...' });
        return this.checkRepoStep();
      })
  }

  checkRepoStep() {
    return checkRepository()
      .then(data => {
        console.log(data);
        if(data.exists) {
          this.setState({ status: 'Uploading files to GitHub...' });
          return this.uploadFilesStep();
        } else {
          this.setState({ status: 'Creating repository...' });
          return this.createRepoStep();
        }
      })
  }

  createRepoStep() {
    return createRepository()
      .then(() => {
        this.setState({ status: 'Uploading files to GitHub...'});
        return this.uploadFilesStep();
      })
  }

  uploadFilesStep() {
    return uploadFiles()
      .then(() => {
        this.props.onExportResult();
        this.setState({ status: 'Success!', icon: 'success', started: false, showLink: true });
      })
  }

  render() {
    return(
      <div className="progress">
        <figure className="status">
          <span className={`icon ${this.state.icon}`}></span>
          <h3>{this.state.status}</h3>
        </figure>
        <p className={this.state.showLink ? 'show': ''}><a target="_blank" href={`https://${SignInTools.GetUsername()}.github.io`}>View your wants list</a></p>
      </div>
    );
  }
}

export default ProgressTracker;