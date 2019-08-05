import React from 'react';
import Item from '../item/item';
const uuid = require('uuid/v1');

class SubSection extends React.Component {
  constructor(props) {
    super(props);

    this.changeTitle = this.changeTitle.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  changeTitle(event) {
    this.props.onUpdateSubsection(
      Object.assign({}, this.props.data, { title: event.target.value })
    );
  }

  addItem() {
    this.props.onUpdateSubsection(
      Object.assign({}, this.props.data, {
        items: [...this.props.data.items, {
          id: uuid(),
          name: '',
          imageUrl: ''
        }]
      })
    );
  }

  removeItem(id) {
    this.props.onUpdateSubsection(
      Object.assign({}, this.props.data, {
        items: this.props.data.items.filter(item => item.id !== id)
      })
    );
  }

  updateItem(newItem) {
    this.props.onUpdateSubsection(
      Object.assign({}, this.props.data, {
        items: this.props.data.items.map(item => item.id === newItem.id ? newItem: item)
      })
    );
  }

  render() {
    return (
      <div className="sub-section-content">
        <input 
          type="text"
          value={this.props.data.title} 
          className='title'
          onChange={(event) => this.changeTitle(event)}
          placeholder="Subsection title" />
        <i className="fa fa-trash"
          title="Remove this subsection"
          onClick={() => this.props.onRemoveSubsection()}></i>
        <div className="row">
          {
            this.props.data.items.map(item => 
              <Item
                data={item}
                key={item.id} 
                onRemoveItem={() => this.removeItem(item.id)} 
                onUpdateItem={(item) => this.updateItem(item)} />
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