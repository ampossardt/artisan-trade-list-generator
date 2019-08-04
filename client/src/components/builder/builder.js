import React from 'react';
import Section from './section/section';
import { saveGist, loadGist } from '../../tools/api';
import { TitleBar, StepBar } from '../bars/bars';
const uuid = require('uuid/v1');

class Builder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: this.props.data
    };

    this.addSection = this.addSection.bind(this);
    this.getEmptySection = this.getEmptySection.bind(this);
    this.handleGistLoad = this.handleGistLoad.bind(this);
    this.handleGistSave = this.handleGistSave.bind(this);
  }

  addSection() {
    const sections = this.state.sections.slice();

    sections.push(this.getEmptySection());

    this.setState({ 
      sections: sections
    });

    this.props.onSectionChange(sections);
  }

  getEmptySection() {
    return {
      id: uuid(),
      title: '',
      subSections: [{ id: uuid(), title: '', items: []}]
    };
  }

  handleGistLoad() {
    return loadGist()
      .then(response => {
        if(response) {
          this.setState({
            sections: response.data.layout
          });
          this.props.onDataChange(response.data);
        }
      });
  }

  handleGistSave() {
    const data = Object.assign(this.props.saveData, { layout: this.state.sections });
    return saveGist({ data });
  }
  
  render() {

    return (
      <div className="container step-container animate">
        <TitleBar 
          onLoadGist={() => this.handleGistLoad()}
          onSaveGist={() => this.handleGistSave()}
          showSave={this.state.sections && this.state.sections.length > 0} 
          title={'Step 1: Configure layout'} />
        <article>
          { this.state.sections.map(item =>
            <Section 
              sectionData={item}
              key={item.id} />
          )}
          <div className="button-container">
            <a 
              onClick={ () => this.addSection() }
              className="add-section">
              Add section...
            </a>
          </div>
        </article>
        <StepBar
          children='Next: Step 2'
          step={2} />
      </div>
    )
  }
}

export default Builder;