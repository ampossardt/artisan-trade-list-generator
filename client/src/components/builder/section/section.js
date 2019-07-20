import React from 'react';
import SubSection from '../subsection/subsection';

class Section extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.sectionData,
      titleClass: '',
      incrementor: 1
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
      id: this.state.incrementor,
      title: '',
      items: []
    });
    data.subSections = subSections;

    this.setState({
      data: data,
      incrementor: this.state.incrementor + 1
    });
  }

  render() {
    return (
      <section>
        <div className="section-content">
          <div className="control-container">
            <span className={`icon ${this.state.titleClass}`}>
              <i className="fa fa-angle-double-right" aria-hidden="true"></i>
            </span>
            <input type="text" 
              value={this.state.data.title} 
              onChange={ (event) => this.titleChangedHandler(event) }
              onFocus={() => this.setState({ titleClass: 'active' }) }
              onBlur={() => this.setState({ titleClass: '' })}
              placeholder="Enter a title..." />
          </div>
          <br/>
          <div className="flex">
            {
              this.state.data.subSections.map(subsection => 
                <SubSection 
                  data={subsection}
                  key={subsection.id} />
            )}
          </div>
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