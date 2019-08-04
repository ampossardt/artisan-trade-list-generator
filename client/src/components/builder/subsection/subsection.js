import React from 'react';
import Item from '../item/item';
const uuid = require('uuid/v1');

class SubSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data
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
      id: uuid(),
      name: '',
      imageUrl: ''
    });
    data.items = items;

    this.setState({
      data: data
    });
  }

  render() {
    return (
      <div className="sub-section-content">
        <input 
          type="text"
          value={this.state.data.title} 
          className='title'
          onChange={(event) => this.titleChangeHandler(event)}
          placeholder="Subsection title" />
        <div className="row">
          {
            this.state.data.items.map(item => 
              <Item
                data={item}
                key={item.id} />
          )}
          <div className="col-2 flex">
            <button 
              className="add item"
              onClick={ () => this.addItem() }>Add item</button>
          </div>
        </div>
        
      </div>
    )
  }
}

export default SubSection;