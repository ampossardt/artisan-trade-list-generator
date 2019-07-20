import React from 'react';

class Instructions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container instructions">
        <h2>Welcome!</h2>
        <p>This site was designed to dynamically create a list of 'artisan wants' via an easy-to-use editor, and then upload the results to GitHub to make use of the free github hosting that is provided to account holders.</p>
      </div>
    );
  }
}

export default Instructions;