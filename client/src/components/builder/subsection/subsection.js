import React from 'react';
import Item from '../item/item';

class SubSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      subtitleClass: '',
      incrementor: 1
    };

    this.titleChangeHandler = this.titleChangeHandler.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  titleChangeHandler(event) {
    const data = Object.assign(this.state.data, { title: event.target.value });

    this.setState({
      data: data
    });
  }

  addItem() {
    const items = this.state.data.items.slice();
    const data = Object.assign(this.state.data);

    items.push({
      id: this.state.incrementor,
      name: '',
      imageUrl: ''
    });
    data.items = items;

    this.setState({
      data: data,
      incrementor: this.state.incrementor + 1
    });
  }

  render() {
    return (
      <div className="sub-section-content">
        <div className="control-container">
          <span className={`icon ${this.state.subtitleClass}`}>
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
          </span>
          <input 
            type="text"
            value={this.state.data.title} 
            onChange={(event) => this.titleChangeHandler(event)}
            onFocus={() => this.setState({ subtitleClass: 'active' }) }
            onBlur={() => this.setState({ subtitleClass: '' })}
            placeholder="Enter a title..." />
        </div>
        <div className="container full-width flex">
          {
            this.state.data.items.map(item => 
              <Item
                data={item}
                key={item.id} />
          )}
        </div>
        <button 
          className="add item"
          onClick={ () => this.addItem() }>Add item</button>
      </div>
    )
  }
}

export default SubSection;