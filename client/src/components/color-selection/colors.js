import React from 'react';
import ColorPreview from './color-preview/color-preview';
import { TitleBarWithButtons, StepBar } from '../bars/bars';
import { saveGist, loadGist } from '../../tools/api';

class ColorSelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = Object.assign({
      changed: false
    }, this.props.data);

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleGistLoad = this.handleGistLoad.bind(this);
    this.handleGistSave = this.handleGistSave.bind(this);
  }

  handleColorChange(key, color) {
    const colors = Object.assign({}, this.state);

    if(colors[key].value !== color.value) {
      colors.changed = true;
    }

    colors[key] = color;

    this.setState(colors);

    this.props.onColorChange(colors);
  }

  handleGistLoad() {
    return loadGist()
      .then(response => {
        if(response) {
          this.setState(Object.assign({ changed: false }, response.data.colors));
          this.props.onDataChange(response.data);
        }
      });
  }

  handleGistSave() {
    const data = Object.assign(this.props.saveData, { colors: this.state });
    this.setState({ changed: false });
    return saveGist({ data });
  }

  render() {
    return(
      <div className="container color-selection step-container animate">
        <TitleBarWithButtons 
          onLoadGist={() => this.handleGistLoad()}
          onSaveGist={() => this.handleGistSave()}
          showSave={this.state.changed} 
          title={'Step 2: Select colors'} />
        <article>
          <section>
            <div className="flex vertical-center">
              <div className="col-4">
                <h2 className="label">Background</h2>
              </div>
              <ColorSelectionItem 
                selected={this.state.backgroundColor}
                title='Background color'
                onColorChange={(color) => this.handleColorChange('backgroundColor', color)} />
            </div>
          </section>
          <section>
            <div className="flex vertical-center">
              <div className="col-4">
                <h2 className="label">Title</h2>
              </div>
              <ColorSelectionItem 
                selected={this.state.titleTextColor}
                title='Title text color'
                onColorChange={(color) => this.handleColorChange('titleTextColor', color)} />
              <ColorSelectionItem 
                selected={this.state.titleBackgroundColor}
                title='Title background color'
                onColorChange={(color) => this.handleColorChange('titleBackgroundColor', color)} />
            </div>
          </section>
          <section>
            <div className="flex vertical-center">
              <div className="col-4">
                <h2 className="label">Subtitle</h2>
              </div>
              <ColorSelectionItem 
                selected={this.state.subtitleTextColor}
                title='Subtitle text color'
                onColorChange={(color) => this.handleColorChange('subtitleTextColor', color)} />
              <ColorSelectionItem 
                selected={this.state.subtitleBackgroundColor}
                title='Subtitle background color'
                onColorChange={(color) => this.handleColorChange('subtitleBackgroundColor', color)} />
            </div>
          </section>
          <section>
            <div className="flex vertical-center">
              <div className="col-4">
                <h2 className="label">Items</h2>
              </div>
              <ColorSelectionItem 
                selected={this.state.itemTextColor}
                title='Item text color'
                onColorChange={(color) => this.handleColorChange('itemTextColor', color)} />
            </div>
          </section>
        </article>
        <ColorPreview colors={this.state} />
        <StepBar
          children='Next: Step 3'
          step={3} />
      </div>
    );
  }
}

class ColorSelectionDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.options = [
      { name: 'turquoise', value: '#1abc9c' },
      { name: 'green', value: '#2ecc71' },
      { name: 'light-blue', value: '#3498db' },
      { name: 'purple', value: '#9b59b6' },
      { name: 'dark-blue', value: '#34495e' },

      { name: 'dark-turquoise', value: '#16a085' },
      { name: 'dark-green', value: '#27ae60' },
      { name: 'blue', value: '#2980b9' },
      { name: 'dark-purple', value: '#8e44ad' },
      { name: 'darker-blue', value: '#2c3e50' },

      { name: 'yellow', value: '#f1c40f' },
      { name: 'orange', value: '#e67e22' },
      { name: 'red', value: '#e74c3c' },
      { name: 'off-white', value: '#ecf0f1' },
      { name: 'gray', value: '#95a5a6' },

      { name: 'dark-yellow', value: '#f39c12' },
      { name: 'dark-orange', value: '#d35400' },
      { name: 'dark-red', value: '#c0392b' },
      { name: 'silver', value: '#bdc3c7' },
      { name: 'dark-gray', value: '#7f8c8d' },
      { name: 'white', value: '#ffffff'},
      { name: 'black', value: '#000000' }
    ];

    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(item) {
    this.setState({ open: false });
    this.props.onColorChange(item);
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  
  render() {
    return(
      <div className={`color-select ${(this.state.open ? 'open' : '')}`}>
        <span 
          className='selected' 
          style={{ backgroundColor: this.props.selected && this.props.selected.value }}
          onClick={ () => this.toggle() }></span>
        <div className='options'>
          {
            this.options.filter(item => !!item.name).map(item => 
              <div 
                key={item.name}
                className={`option ${item.name}`}
                onClick={() => this.handleColorChange(item)}
                value={item}></div>
          )}
        </div>
      </div>
    );
  }
}

function ColorSelectionItem(props) {
  return(
    <div className="col-4">
      <ColorSelectionDropdown 
        selected={props.selected}
        onColorChange={(color) => props.onColorChange(color)} /><h3>{props.title}</h3>
    </div>
  );
}

export default ColorSelection;