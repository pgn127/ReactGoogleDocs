import React from 'react';
import ReactDOM from 'react-dom';
import 'draft-js/dist/Draft.css';
import ButtonToolbar from './ButtonToolbar.js';
import {Editor, EditorState, RichUtils} from 'draft-js';


// const styleMap = {
//   'STRIKETHROUGH': {
//     textDecoration: 'line-through',
// },
// 'BOLD': {
//     fontWeight: 'bold'
// }
// };



class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        editorState: EditorState.createEmpty()
    };

    this.onChange = (editorState) => this.setState({editorState});
    // this.handleKeyCommand = (command) => this._handleKeyCommand(command);
  }


//USED FOR BOLD,
  _toggleInlineStyle(inlineStyle) {
      this.onChange( RichUtils.toggleInlineStyle(this.state.editorState,inlineStyle));
}

//USED FOR: unorderedlist, orderedlist
_toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
}
  //
  // _handleKeyCommand(command) {
  //       this.onChange(RichUtils.handleKeyCommand(this.state.editorState, command))
  //   }

  _onTab(e) {
      const maxDepth = 8;
      this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }



  render() {
    return (
      <div >
          <ButtonToolbar
              //   onBoldClick={() => this.onBoldClick()}
              onInlineToggle={(stylename) => this._toggleInlineStyle(stylename)}
              onBlockToggle={(blockType) => this._toggleBlockType(blockType)}

          />
          <div style={{border: '1px solid black'}} className="editor">
              <Editor

                  //   customStyleMap={styleMap}
                  editorState={this.state.editorState}
                  onChange={this.onChange}
                  onTab={this._onTab.bind(this)}
                  //   handleKeyCommand={this.handleKeyCommand}
                  //   onTab={() => this.handleTab(event)}
              />
          </div>
        </div>
    );
  }
}

export default MyEditor;
