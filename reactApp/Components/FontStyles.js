import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from './StyleButton.js'

var FONT_STYLES = [
  {label: 'icon-bold', style: 'BOLD'},
  {label: 'icon-italic', style: 'ITALIC'},
  {label: 'icon-underline', style: 'UNDERLINE'},
  {label: 'icon-font', style: 'FONT_COLOR'},
  {label: 'icon-text-height', style: 'FONT_SIZE'},
];

const FontStyles = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return (
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
  );
};

export default FontStyles;
