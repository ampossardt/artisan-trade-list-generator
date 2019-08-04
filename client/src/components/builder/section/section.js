import React from 'react';
import SubSection from '../subsection/subsection';
const uuid = require('uuid/v1');

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.sectionData
    };

    this.titleChangedHandler = this.titleChangedHandler.bind(this);
    this.addSubSection = this.addSubSection.bind(this);
  }

  titleChangedHandler(event) {
    const data = Object.assign(this.state.data, { title: event.target.value });

    this.setState({
      data: data
    });
  }

  addSubSection() {
    const subSections = this.state.data.subSections.slice();
    const data = Object.assign(this.state.data);

    subSections.push({
      id: uuid(),
      title: '',
      items: []
    });
    data.subSections = subSections;

    this.setState({
      data: data
    });
  }

  render() {
    return (
      <section>
        <div className="section-content">
          <input type="text"
            className="primary title"
            value={this.state.data.title} 
            onChange={ (event) => this.titleChangedHandler(event) }
            placeholder="Section Title" />
          {
            this.state.data.subSections.map(subsection => 
              <SubSection 
                data={subsection}
                key={subsection.id} />
          )}
          <button 
            className="add"
            onClick={() => this.addSubSection()}>
            Add subsection...
          </button>
        </div>
      </section>
    );
  }
}

export default Section;