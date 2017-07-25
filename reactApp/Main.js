var React = require('React');
import {Editor, EditorState, RichUtils} from 'draft-js';
//Raised button
//AppBar
//Popover

export default class Main extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  onChange(editorState){
    this.setState({
      editorState
    })
  }
  render(){
    return(
      <div>
        <h1>Editor</h1>
        <Editor
          onChange={this.onChange.bind(this)}
          editorState={this.state.editorState}
        />
      </div>
    )
  }
}
