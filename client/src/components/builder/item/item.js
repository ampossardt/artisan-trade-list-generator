import React from 'react';
import { toast } from 'react-toastify';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.readFileUrl = this.readFileUrl.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  readFileUrl(event) {
    let reader = new FileReader();

    reader.onloadend = () => {
      this.props.onUpdateItem(
        Object.assign({}, this.props.data, { imageUrl: reader.result })
      );
    };
    
    const file = event.target.files[0];

    if(file) {
      if(file.size / 1000 > 80) {
        toast(`Maximum file size is 80kb. The image you tried to add was ${file.size / 1000}kb.`, {
          type: 'error'
        });

        event.target.value = null;

        return;
      }

      reader.readAsDataURL(file);
    }
  }

  updateName(event) {
    this.props.onUpdateItem(
      Object.assign({}, this.props.data, { name: event.target.value })
    );
  }

  render() {
    return (
      <div className="col-2">
        <div className="item">
          <input
            type="text"
            value={this.props.data.name}
            onChange={ (event) => this.updateName(event) }
            placeholder="Name"
            autoComplete="off" />
          <i className="fa fa-trash"
            title="Remove this item"
            onClick={() => this.props.onRemoveItem()}></i>
          <input 
            type="file" 
            onChange={ (event) => this.readFileUrl(event) } />
          <img className="preview" alt="" src={this.props.data.imageUrl} />
        </div>
      </div>
    );
  }
}

export default Item;