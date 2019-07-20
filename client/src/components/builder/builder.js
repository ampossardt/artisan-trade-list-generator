import React from 'react';
import Section from './section/section'

class Builder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: [],
      sectionIdIncrementor: 1
    };

    this.addSection = this.addSection.bind(this);
    this.updateSection = this.updateSection.bind(this);
    this.getEmptySection = this.getEmptySection.bind(this);
  }

  addSection() {
    const sections = this.state.sections.slice();
    const newSection = this.getEmptySection(this.state.sectionIdIncrementor);
    sections.push(newSection);

    this.setState({ 
      sections: sections,
      sectionIdIncrementor: this.state.sectionIdIncrementor + 1
    });
  }

  updateSection(section) {
    // const sections = this.state.sections.slice();
    // sections.splice(section.id - 1, )
    // sections.
  }

  getEmptySection(id) {
    return {
      id: id,
      title: '',
      subSections: []
    };
  }
  
  render() {
    console.log(this.state.sections);

    return (
      <div className="container">
        <h1 className="label">Step 1: Configure list layout</h1>
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
              Add new section...
            </a>
          </div>
        </article>
      </div>
    )
  }
}

export default Builder;