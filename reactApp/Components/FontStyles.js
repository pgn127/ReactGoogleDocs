import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from './StyleButton.js'

var FONT_STYLES = [
  {label: 'icon-bold', style: 'BOLD'},
  {label: 'icon-italic', style: 'ITALIC'},
  {label: 'icon-underline', style: 'UNDERLINE'},
  // {label: 'icon-font', style: 'FONT_COLOR'},
  // {label: 'icon-text-height', style: 'FONT_SIZE'},
];

const FontStyles = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  var fontSize = '';
  var fontColor = '';

  return (
      <div>
          <div className="RichEditor-controls">
              {FONT_STYLES.map(type =>
                  <StyleButton
                      key={type.label}
                      active={currentStyle.has(type.style)}
                      label={type.label}
                      onToggle={props.onToggle}
                      style={type.style}
                  />
              )}
          </div>
          <input type="text"
              onChange={(e) => {fontSize = e.target.value;}}
              onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                      props.onFontSizeClick(fontSize);
                  }
              }} />
          <input type="text"
              onChange={(e) => {fontColor = e.target.value;}}
              onKeyUp={(e) => {
                  if (e.keyCode === 13) {
                      props.onFontColorClick(fontColor);
                  }
              }} />
      </div>
  );
};

export default FontStyles;
