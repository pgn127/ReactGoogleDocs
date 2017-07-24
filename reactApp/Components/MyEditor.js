import React from 'react';
import ReactDOM from 'react-dom';
import 'draft-js/dist/Draft.css';
import ButtonToolbar from './ButtonToolbar.js';
import FontStyles from './FontStyles.js';
import BlockStyles from './BlockStyles.js';
import {Editor, EditorState, RichUtils} from 'draft-js';



const styleMap = {
  'STRIKETHROUGH': {
    textDecoration: 'line-through',
  },
  'BOLD': {
    fontWeight: 'bold'
  }
};

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

  }

  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'BOLD'
    ));
  }

  // onStyleChange(editorState, styleString) {
  //     //takes in this.state.editorState and a string representing a style 'BOLD'
  //     this.setState({editorState: RichUtils.toggleInlineStyle(
  //       this.state.editorState,
  //       styleString
  //     )})
  // }
  _toggleBlockType(blockType) {
      this.onChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      );
    }
  _toggleInlineStyle(inlineStyle) {
          this.onChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
          );
        }
  // _handleKeyCommand(command) {
  //   const {editorState} = this.state;
  //   const newState = RichUtils.handleKeyCommand(editorState, command);
  //   if (newState) {
  //     this.onChange(newState);
  //     return true;
  //   }
  //   return false;
  // }
  _onTab(e) {
          const maxDepth = 8;
          this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
        }
  render() {
    return (
      <div >
        IN EDITOR. CODE IS WORKING.
        {/* <button onClick={this._onBoldClick.bind(this)}>Bold</button> */}
        {/* <button onClick={() => this.onChange(this.state.editorState, 'BOLD')}>Bold</button> */}
        <div className="btn-toolbar">
          <div className="btn-group">
            <FontStyles
               editorState={this.state.editorState}
               onToggle={this.toggleInlineStyle}
             />
           </div>
          <div className="btn-group">
            <BlockStyles
              editorState={this.state.editorState}
              onToggle={this.toggleBlockType}
            />
          </div>
          </div>
            <div style={{border: '1px solid black'}} className="editor">
              <Editor customStyleMap={styleMap} editorState={this.state.editorState} onChange={this.onChange} />
            </div>
      </div>
    );
  }
}

export default MyEditor;
