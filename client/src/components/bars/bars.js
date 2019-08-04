import React from 'react';
import { Tooltip, Button } from '../generic';

export function ExportBar(props) {
  return(
    <div className="flex prevent-stretch">
      <h1 className="label">{props.title}</h1>

      <Button
        className={'button right github'}
        onClick={() => props.onExport() }
        children={'Export to GitHub'}
        disabled={!props.showSave}
        hideLoader={true}
      />
    </div>
  );
}

export function StepBar(props) {
  return(
    <div className="step-bar">
      <Button
        className={'button turquoise step'}
        children={props.children}
        onClick={() => window.location.hash = `step${props.step}`}
        hideLoader={true} />
    </div>
  );
}

export function TitleBar(props) {
  return (
    <div>
      <h1 className="label">{props.title}</h1>
    </div>
  );
}

export function TitleBarWithButtons(props) {
  return(
    <div className="flex prevent-stretch">
      <h1 className="label">{props.title}</h1>
      <Button
        className={'button right secondary'}
        onClick={() => props.onLoadGist()}
        successMessage='Layout loaded!'
        failureMessage='There was a problem retrieving your layout. Try again.'
        children={'Load'}
      />
      <Button
        className={'button green'}
        disabled={!props.showSave}
        onClick={() => props.onSaveGist() } 
        successMessage='Layout successfully saved!'
        failureMessage='There was a problem saving your layout. Try again.'
        children={'Save'}
      />
      <Tooltip content={"Save your layout and colors for retrieval later, or load your previously saved layout to make edits. All changes are saved as a GitHub Gist."} />
    </div>
  );
}