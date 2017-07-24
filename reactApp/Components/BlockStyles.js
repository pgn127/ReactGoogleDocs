import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from './StyleButton.js'


const BlockStyles = (props) => {
      const {editorState} = props;
      const selection = editorState.getSelection();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

      return (
        <div className="inlineControls">
          {BLOCK_TYPES.map((type) =>
            <StyleButton
              key={type.label}
              active={type.style === blockType}
              label={type.label}
              onToggle={props.onToggle}
              style={type.style}
            />
          )}
        </div>
      );
    };

    const BLOCK_TYPES = [
            {label: 'icon-list', style: 'unordered-list-item'},
            {label: 'icon-list-numbered', style: 'ordered-list-item'},
            {label: 'icon-align-left', style: 'code-block'},
            {label: 'icon-align-center', style: 'code-block'},
            {label: 'icon-align-right', style: 'code-block'},

          ];

export default BlockStyles;
