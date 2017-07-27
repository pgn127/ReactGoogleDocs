import React from 'react';
import ReactDOM from 'react-dom';
import StyleButton from './StyleButton.js'


const BlockStyles = (props) => {
     const {editorState} = props;

    // console.log('editor.getselection', editorState.getSelection(),editorState.getSelection().getStartKey(),editorState.getCurrentContent().getBlockForKey(selection.getStartKey()));

      const selection = editorState.getSelection();
      const block = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())

        // .getType();
        let blockType;
        if(block) {
            blockType = block.getType()
        }

      return (
        <div className="inlineControls">
            {BLOCK_TYPES.map((type) =>
                {
                    if(type.label === 'icon-align-left') {
                        return <StyleButton
                            key={type.label}
                            active={blockType && type.style === blockType}
                            label={type.label}
                            onToggle={props.onToggle}
                            style={type.style}
                               />
                    }
                    else if(type.label === 'icon-align-center') {
                        return <StyleButton
                            key={type.label}
                            active={blockType && type.style === blockType}
                            label={type.label}
                            onToggle={props.onToggle}
                            style={type.style}
                               />
                    }
                    else if(type.label === 'icon-align-right') {
                        return <StyleButton
                            key={type.label}
                            active={blockType && type.style === blockType}
                            label={type.label}
                            onToggle={props.onToggle}
                            style={type.style}
                               />
                    }
                    else {
                        return <StyleButton
                            key={type.label}
                            active={blockType && type.style === blockType}
                            label={type.label}
                            onToggle={props.onToggle}
                            style={type.style}
                               />
                    }
                }

            )}

            {/* {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )} */}
        </div>
      );
    };

    // const BLOCK_TYPES = [
    //         {label: 'icon-list', style: 'unordered-list-item'},
    //         {label: 'icon-list-numbered', style: 'ordered-list-item'},
    //         {label: 'icon-align-left', style: 'code-block'},
    //         {label: 'icon-align-center', style: 'code-block'},
    //         {label: 'icon-align-right', style: 'code-block'},
    //
    //       ];
    const BLOCK_TYPES = [
            {label: 'icon-list-ul', style: 'unordered-list-item'},
            {label: 'icon-list-ol', style: 'ordered-list-item'},
            {label: 'icon-align-left', style: 'alignLeft'},
            {label: 'icon-align-center', style: 'alignCenter'},
            {label: 'icon-align-right', style: 'alignRight'},
          ];

export default BlockStyles;
