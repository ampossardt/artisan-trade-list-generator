import React from 'react';
import SubSection from '../subsection/subsection';
const uuid = require('uuid/v1');

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.changeTitle = this.changeTitle.bind(this);
    this.addSubSection = this.addSubsection.bind(this);
    this.removeSubsection = this.removeSubsection.bind(this);
  }

  changeTitle(event) {
    this.props.onUpdateSection(
      Object.assign({}, this.props.data, { title: event.target.value })
    );
  }

  addSubsection() {
    this.props.onUpdateSection(
      Object.assign({}, this.props.data, {
        subSections: [...this.props.data.subSections, {
          id: uuid(),
          title: '',
          items: []
        }]
      })
    );
  }

  removeSubsection(id) {
    this.props.onUpdateSection(
      Object.assign({}, this.props.data, {
        subSections: this.props.data.subSections.filter(subsection => subsection.id !== id)
      })
    );
  }

  updateSubsection(newSubsection) {
    this.props.onUpdateSection(
      Object.assign({}, this.props.data, {
        subSections: this.props.data.subSections.map(subsection => subsection.id === newSubsection.id ? newSubsection : subsection)
      })
    );
  }

  render() {
    return (
      <section>
        <div className="section-content">
          <input type="text"
            className="primary title"
            value={this.props.data.title} 
            onChange={ (event) => this.changeTitle(event) }
            placeholder="Section Title" />
          <i className="fa fa-trash"
            title='Remove this section'
            onClick={() => this.props.onRemoveSection()}></i>
          {
            this.props.data.subSections.map(subsection => 
              <SubSection 
                data={subsection}
                key={subsection.id}
                onRemoveSubsection={() => this.removeSubsection(subsection.id)}
                onUpdateSubsection={(subsection) => this.updateSubsection(subsection)} />
          )}
          <button 
            className="add"
            onClick={() => this.addSubsection()}>
            Add subsection...
          </button>
        </div>
      </section>
    );
  }
}

export default Section;