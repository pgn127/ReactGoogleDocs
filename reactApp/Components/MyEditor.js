import React from 'react';
import ReactDOM from 'react-dom';
import 'draft-js/dist/Draft.css';
// import ButtonToolbar from './ButtonToolbar.js';
import FontStyles from './FontStyles.js';
import BlockStyles from './BlockStyles.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
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
      editorState: EditorState.createEmpty(), //editorState from draftjs
      documentName: 'Document Name'
    };

    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();
  }


  // onChange(editorState) {
  //     this.setState({editorState})
  // }


//USED FOR BOLD, and styles supported by FontStyles.js
  _toggleInlineStyle(inlineStyle) {
      this.onChange( RichUtils.toggleInlineStyle(this.state.editorState,inlineStyle));
}

//USED FOR: unorderedlist, orderedlist
_toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
}

  _onTab(e) {
      const maxDepth = 8;
      this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }



  render() {
    return (
      <div >
          <AppBar title={this.state.documentName}/>
          <div className="docContainer">

              {/* <IconButton tooltip="Font Icon">
                  <FontIcon className="muidocs-icon-action-home" />
              </IconButton> */}
              <div className="btn-toolbar editorToolbar">
                      <div className="btn-group">
                          <FontStyles
                              editorState={this.state.editorState}
                              onToggle={this._toggleInlineStyle.bind(this)}
                          />
                      </div>
                      <div className="btn-group">
                          <BlockStyles
                              editorState={this.state.editorState}
                              onToggle={this._toggleBlockType.bind(this)}
                          />
                      </div>
                  </div>
              <div className="editor">
                  <Editor
                      customStyleMap={styleMap}
                      editorState={this.state.editorState}
                      onChange={this.onChange}
                      onTab={this._onTab.bind(this)}
                  />
              </div>
          </div>
      </div>
    );
  }
}

export default MyEditor;
