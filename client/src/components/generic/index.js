import React from 'react';
import { toast } from 'react-toastify';

export function Tooltip(props) {
  return (
    <div className={`${props.className || ''} tooltip`}>
      <i className="fa fa-question-circle" aria-hidden="true"></i>
      <span className='content'>{props.content}</span>
    </div>
  )
}

export class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {
    if(this.state.loading) return;
    
    if(!this.props.hideLoader) {
      this.setState({ loading: true });
      
      this.props.onClick()
      .then(() => {
        this.setState({ loading: false });

        if(this.props.successMessage) {
          toast(this.props.successMessage, {
            type: 'success'
          });
        }
      })
      .catch(error => {
        console.error(error);
        this.setState({ loading: false });

        if(this.props.failureMessage) {
          toast(this.props.failureMessage, {
            type: 'error'
          });
        }
      });
    } else {
      this.props.onClick();
    }
  }
  
  render() {
    return (
      <button 
        className={`${this.props.className || ''} ${(this.state.loading && 'icon loading') || ''}`}
        disabled={this.props.disabled}
        onClick={() => this.clickHandler() }>
        {this.props.children}
      </button>
    );
  }
}