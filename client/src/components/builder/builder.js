import React from 'react';
import Section from './section/section';
import { saveGist, loadGist } from '../../tools/api';
import { TitleBarWithButtons, StepBar } from '../bars/bars';
const uuid = require('uuid/v1');

class Builder extends React.Component {
  constructor(props) {
    super(props);

    this.addSection = this.addSection.bind(this);
    this.removeSection = this.removeSection.bind(this);
    this.updateSection = this.updateSection.bind(this);

    this.handleGistLoad = this.handleGistLoad.bind(this);
    this.handleGistSave = this.handleGistSave.bind(this);
  }

  addSection() {
    this.props.onSectionChange([
      ...this.props.sections, {
        id: uuid(),
        title: '',
        subSections: [{ id: uuid(), title: '', items: []}]
      }
    ]);
  }

  removeSection(id) {
    this.props.onSectionChange(
      this.props.sections.filter(section => section.id !== id)
    );
  }

  updateSection(newSection) {
    this.props.onSectionChange(
      this.props.sections.map(section => section.id === newSection.id ? newSection : section)
    );
  }

  handleGistLoad() {
    return loadGist()
      .then(response => {
        if(response) {
          this.props.onDataChange(response.data);
        }
      });
  }

  handleGistSave() {
    const data = Object.assign(this.props.saveData, { layout: this.props.sections });
    return saveGist({ data });
  }
  
  render() {
    return (
      <div className="container step-container animate">
        <TitleBarWithButtons 
          onLoadGist={() => this.handleGistLoad()}
          onSaveGist={() => this.handleGistSave()}
          showSave={this.props.sections && this.props.sections.length > 0} 
          title={'Step 1: Configure layout'} />
        <article>
          { this.props.sections.map(item =>
              <Section 
                data={item}
                key={item.id}
                onRemoveSection={() => this.removeSection(item.id)}
                onUpdateSection={(section) => this.updateSection(section)} />
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