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
import {Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap} from 'draft-js';
import { Map } from 'immutable';


const styleMap = {
  'BOLD': {
    fontWeight: 'bold'
  },
  'ITALIC': {
     'fontStyle': 'italic'
  },
  'UNDERLINE': {
     'textDecoration': 'underline'
  },
  'FONT-COLOR': {
    'color': 'black'
  },
  'FONT-SIZE': {
     'fontSize': '12px'
  },
  'TEXT-ALIGN-LEFT': {
      'textAlign': 'left'
  },
  'TEXT-ALIGN-CENTER': {
      'textAlign': 'center'
  },
  'TEXT-ALIGN-RIGHT': {
      'textAlign': 'right'
  }
};

const blockRenderMap = Map({
  'alignRight': {
    element: 'div'
  },
  'alignLeft': {
    element: 'div'
  },
  'alignCenter': {
    element: 'div'
  }
});

// Include 'paragraph' as a valid block and updated the unstyled element but
// keep support for other draft default block types
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

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

myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === 'alignRight') {
    return 'align-right';
  }
  else if (type === 'alignLeft') {
    return 'align-left';
  }
  else if (type === 'alignCenter') {
    return 'align-center';
  }
  return "";
}

onFontSizeClick(fontSize) {
   var parsed = parseInt(fontSize);
   styleMap['FONT-SIZE-' + fontSize] = {
      'fontSize': parsed + 'px'
   };
   console.log(styleMap);
   this.onChange(RichUtils.toggleInlineStyle(
     this.state.editorState,
     'FONT-SIZE-' + fontSize
   ));
 }

 onFontColorClick(fontColor) {
   styleMap['FONT-COLOR-' + fontColor] = {
      'color': fontColor
   };
   console.log(styleMap);
   this.onChange(RichUtils.toggleInlineStyle(
     this.state.editorState,
     'FONT-COLOR-' + fontColor
   ));
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
                          onFontSizeClick={(fontSize) => this.onFontSizeClick(fontSize)}
                          onFontColorClick={(fontColor) => this.onFontColorClick(fontColor)}
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
                      blockRenderMap={extendedBlockRenderMap}
                      blockStyleFn={this.myBlockStyleFn}
                  />
              </div>
          </div>
      </div>
    );
  }
}

export default MyEditor;
