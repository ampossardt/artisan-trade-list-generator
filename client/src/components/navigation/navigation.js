import React from 'react';

const Navigation = (props) => {
  return(
    <nav className="progress-navigation">
      <div className="progress-content flex">
        <h3 
          className={(props.step <= 3 && 'active') || ''}
          onClick={() => window.location.hash = 'step1'}>
            1. Setup
        </h3>
        <hr className={(props.step > 1 && 'active') || ''} />
        <h3 
          className={(props.step > 1 && 'active') || ''}
          onClick={() => window.location.hash = 'step2'}>
            2. Colors
        </h3>
        <hr className={(props.step === 3 && 'active') || ''}/>
        <h3 
          className={(props.step === 3 && 'active') || ''}
          onClick={() => window.location.hash = 'step3'}>
            3. Export
        </h3>
      </div>
    </nav>
  );
}

export default Navigation;