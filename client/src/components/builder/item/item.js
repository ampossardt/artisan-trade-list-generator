import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      nameClass: ''
    };

    this.readFileUrl = this.readFileUrl.bind(this);
    this.updateName = this.updateName.bind(this);
  }

  readFileUrl(event) {
    console.log(event);
    let reader = new FileReader();

    reader.onloadend = () => {
      const data = Object.assign(this.state.data, { imageUrl: reader.result });
      
      this.setState({
        data: data
      });
    };
    
    const file = event.target.files[0];

    if(file) {
      reader.readAsDataURL(file);
    }
  }

  updateName(event) {
    const data = Object.assign(this.state.data, { name: event.target.value });

    this.setState({
      data: data
    });
  }

  render() {
    return (
      <div className="col-2">
        <div className="item">
          <input
            type="text"
            value={this.state.data.name}
            onChange={ (event) => this.updateName(event) }
            onFocus={() => this.setState({ nameClass: 'active' }) }
            onBlur={() => this.setState({ nameClass: '' })}
            placeholder="Name"
            autoComplete="off" />
          <input 
            type="file" 
            onChange={ (event) => this.readFileUrl(event) } />
          <img className="preview" src={this.state.data.imageUrl} />
        </div>
      </div>
    );
  }
}

export default Item;