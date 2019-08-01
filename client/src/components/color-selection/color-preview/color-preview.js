import React from 'react';

function ColorPreview(props) {
    const {
      backgroundColor,
      titleTextColor,
      titleBackgroundColor,
      subtitleTextColor,
      subtitleBackgroundColor,
      itemTextColor
    } = props.colors;

    return(
      <article>
        <div className="color-preview">
          <h2>Preview</h2>
          <div className="preview">
            <div className="preview-content" style={{ backgroundColor: backgroundColor.value }}>
              <h1 style={{ color: titleTextColor.value }}>Wants List</h1>
              <main>
                <h2 style={{ color: titleTextColor.value, backgroundColor: titleBackgroundColor.value }}>Title</h2>
                <h3 style={{ color: subtitleTextColor.value, backgroundColor: subtitleBackgroundColor.value }}>Subtitle</h3>
                <div className="flex">
                  <div className="col-4">
                    <div className="placeholder-image"></div>
                    <p style={{ color: itemTextColor.value }}>Item</p>
                  </div>
                  <div className="col-4">
                    <div className="placeholder-image"></div>
                    <p style={{ color: itemTextColor.value }}>Item</p>
                  </div>
                  <div className="col-4">
                    <div className="placeholder-image"></div>
                    <p style={{ color: itemTextColor.value }}>Item</p>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </article>
    );
}

export default ColorPreview;