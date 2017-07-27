import React from 'react';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import 'draft-js/dist/Draft.css';
import randomColor from 'randomcolor'; // import the script
import FontStyles from './FontStyles.js';
import BlockStyles from './BlockStyles.js';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import {Editor, EditorState, RichUtils, ContentState, DefaultDraftBlockRenderMap, convertFromRaw, convertToRaw, Modifier} from 'draft-js';
import { Map } from 'immutable';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
var Mousetrap = require('mousetrap');


import io from 'socket.io-client'
const socket = io.connect("http://localhost:3000/");
const baseURL = 'http://localhost:3000/'

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
    'fontSize': '12'
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
    this.previousHighLight = null;
    this.state = {
      editorState: EditorState.createEmpty(), //editorState from draftjs
      title: 'Untitled Document',
      saved: false,
      alertOpen: false,
      collaborators: [],
      currentDocument:  {},
      goBack: false,
      isFileOpen: false,
      autosave: false,
      currentUser: {
        _id: '597797018cccf651b76f25ac',
        name: 'Frankie',
        password: 'Frankie1!',
        email: 'fflores@colgate.edu'
      },
      collabModalOpen: false,
      newCollaborators: [],
      newCollaborator: '',
      styleMap: {
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
        },
        'RED': {
          'backgroundColor': 'red'
        }
      },
      room: ""
    };
    //doc id is this.props.match.params.docId
    // this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();
    Mousetrap.bind('command+s', this.onSave.bind(this));
    Mousetrap.stopCallback = function () {
      return false;
    }
  }

  autoSave(){
    setInterval(this.onSave.bind(this), 30000);
    this.setState({
      autosave: !this.state.autosave,
    })
  }

  onChange(editorState) {
    this.setState({editorState: editorState, saved: false})
    // const selection = editorState.getSelection();
    //
    // if(this.previousHighLight) {
    //   editorState = EditorState.acceptSelection(editorState, this.previousHighLight);
    //   editorState = RichUtils.toggleInlineStyle(editorState, 'RED');
    //   editorState = EditorState.acceptSelection(editorState, selection);
    // }
    //
    // editorState = RichUtils.toggleInlineStyle(editorState, 'RED');
    // this.previousHighLight = editorState.getSelection();
    //
    // const contentState = editorState.getCurrentContent();
    // const stringifiedContent = JSON.stringify(convertToRaw(contentState));
    //
    // socket.emit('cursor', {
    //   room: this.state.room,
    //   currentContent: stringifiedContent
    // });
    //
    // this.setState({editorState: editorState});

    //this.setState({editorState: editorState, saved: false})

    var selectionState = editorState.getSelection();
    var anchorKey = selectionState.getAnchorKey();
    var currentContent = editorState.getCurrentContent();
    var currentContentBlock = currentContent.getBlockForKey(anchorKey);
    var start = selectionState.getStartOffset();
    var end = selectionState.getEndOffset();
    var selectedText = currentContentBlock.getText().slice(start, end);

    if(this.previousHighLight) {
      editorState = EditorState.acceptSelection(editorState, this.previousHighLight);
      editorState = RichUtils.toggleInlineStyle(editorState, 'RED');
      editorState = EditorState.acceptSelection(editorState, selectionState);
    }
    editorState = RichUtils.toggleInlineStyle(editorState, 'RED');
    this.previousHighLight = editorState.getSelection();

    console.log("onChange", currentContent.getPlainText());
    console.log(start, end, selectedText);
    socket.emit('cursor', {
      room: this.state.room,
      start: start,
      end: end,
      selectedText: selectedText,
      currentContent: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
    });

    //this.setState({editorState: editorState});

  }

  componentDidMount(){
    socket.on('update', (data) => {
      console.log('hit');
      const updatedState = convertFromRaw(JSON.parse(data.currentContent));
      this.setState({editorState: EditorState.createWithContent(updatedState)});

    });

    socket.on('redirect', () => {
      alert("Full");
      this.props.history.push('/directory');
    });

    console.log(this.props.match.params.docId);
    fetch(baseURL+'documents/'+this.props.match.params.docId)
    .then((response) => {

      return response.json()
    })
    .then((resp) => {
      console.log("pulled doc", resp.document);
      //if this document has no content dont overwrite empty editorState in the state
      if(resp.document.content === ""){
        console.log('document content was empty ');
        this.setState({saved: false, currentDocument: resp.document, collaborators: resp.document.collaborators, title: resp.document.title});

      } else {
        console.log('document has an existing state');
        const contentState = convertFromRaw( JSON.parse(resp.document.content) ) ;
        var currentDocument = Object.assign({}, resp.document, {content: contentState})
        this.setState({saved: false, currentDocument: currentDocument, collaborators: currentDocument.collaborators, title: currentDocument.title, editorState: EditorState.createWithContent(contentState) })

        socket.emit('room', currentDocument.title);
        this.setState({room: currentDocument.title});

      }
      // console.log('document collaborators ', currentDocument.collaborators);
      // this.setState({currentDocument: resp.document})
    })
    .catch((err)=>console.log('error pulling doc', err));

  }



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

  onFontSizeIncreaseClick() {
    var font = this.state.styleMap['FONT-SIZE']['fontSize'];
    var fontSize = parseInt(font.slice(0, font.indexOf('p')));
    fontSize += 2;
    var newFontSize = fontSize.toString() + 'px';
    var newStyleMap = Object.assign({}, this.state.styleMap, {'FONT-SIZE': {
      fontSize: newFontSize
    }});
    this.setState({styleMap: newStyleMap}, () => {
      this.state.styleMap['FONT-SIZE-' + fontSize.toString()] = {
        fontSize: newFontSize
      };
      console.log(this.state.styleMap);
      this.onChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        'FONT-SIZE-' + (fontSize + 2).toString()
      ));
      this.onChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        'FONT-SIZE-' + fontSize.toString()
      ));
    });
  }

  onFontColorClick(fontColor) {
    var hex = fontColor.hex;
    this.state.styleMap['FONT-COLOR-' + hex] = {
      'color': hex
    };
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'FONT-COLOR-' + hex
    ));
  }

  _onTab(e) {
    const maxDepth = 8;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }


  onSave(){
    var newContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    // console.log('content that is being saved is ', newContent);
    var newTitle = this.state.title;
    fetch(baseURL+'/documents/save/'+this.props.match.params.docId, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: newContent,
        title: newTitle,
        //   password: newPassword,
        //   collaborators: newCollaborators

      })
    })
    .then((response) => {
      console.log('response in on save ', response);
      return response.json()
    })
    .then((resp) => {
      console.log("saved document", resp.document);
      const contentState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
      var rawContent = this.state.editorState.getCurrentContent();
      var currentDocument = Object.assign({}, resp.document, {content: rawContent})

      this.setState({saved: true, currentDocument: currentDocument, title: newTitle, editorState: EditorState.createWithContent(rawContent) })
    })
    .catch((err)=>console.log('error saving doc', err))
    //   console.log('the current document to save is ', this.state.currentDocument);
  }



  onFontSizeDecreaseClick() {
    var font = this.state.styleMap['FONT-SIZE']['fontSize'];
    var fontSize = parseInt(font.slice(0, font.indexOf('p')));
    fontSize -= 2;
    var newFontSize = fontSize.toString() + 'px';
    var newStyleMap = Object.assign({}, this.state.styleMap, {'FONT-SIZE': {
      fontSize: newFontSize
    }});
    this.setState({styleMap: newStyleMap}, () => {
      this.state.styleMap['FONT-SIZE-' + fontSize.toString()] = {
        fontSize: newFontSize
      };
      console.log(this.state.styleMap);
      this.onChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        'FONT-SIZE-' + (fontSize + 2).toString()
      ));
      this.onChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        'FONT-SIZE-' + fontSize.toString()
      ));
    });
  }

  onFontColorClick(fontColor) {
    var hex = fontColor.hex;
    this.state.styleMap['FONT-COLOR-' + hex] = {
      'color': hex
    };
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      'FONT-COLOR-' + hex
    ));
  }

  _onTab(e) {
    const maxDepth = 8;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }



  onSave(){
    var newContent = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    // console.log('content that is being saved is ', newContent);
    var newTitle = this.state.title;
    fetch(baseURL+'documents/save/'+this.props.match.params.docId, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: newContent,
        title: newTitle,
        //   password: newPassword,
        //   collaborators: newCollaborators

      })
    })
    .then((response) => {
      console.log('response in on save ', response);
      return response.json()
    })
    .then((resp) => {
      console.log("saved document", resp.document);
      const contentState = JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
      var rawContent = this.state.editorState.getCurrentContent();
      var currentDocument = Object.assign({}, resp.document, {content: rawContent})

      this.setState({saved: true, currentDocument: currentDocument, title: newTitle, editorState: EditorState.createWithContent(rawContent) })
    })
    .catch((err)=>console.log('error saving doc', err))
    //   console.log('the current document to save is ', this.state.currentDocument);
  }
  onAlertOpen() {
    this.setState({alertOpen: !this.state.saved});
  }


  onCollabSubmit() {
    console.log("DOCID", this.props.match.params.docId);
    console.log("NEWCOLLAB", this.state.newCollaborators);
    fetch(baseURL+'documents/add/collaborator/'+this.props.match.params.docId, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        collaboratorEmails: this.state.newCollaborators
        //   collaborators: newCollaborators

      })
    })
    .then((response) => {
      console.log('response from add collabs ', response);
      return response.json()
    })
    .then((resp) => {
      console.log('respose json is add collabs ', resp);
      this.setState({
        isFileOpen: false,
        collaborators: resp.document.collaborators, collabModalOpen: false
        // newPassword: resp.document.password
      })
    })
    .catch((err)=> {
      console.log('error in add collabs', err)
      this.setState({collabModalOpen: false});
      alert(`error adding collaborators ${this.state.newCollaborators}`)
    })
  }


  // render() {
  //     const actions = [
  //         <FlatButton label="Cancel" primary={true} onTouchTap={this.onAlertClose.bind(this)}/>,
  //           <FlatButton label="Go back anyway" primary={true} onTouchTap={this.onAlertOk.bind(this)}/>]
  //         if (this.state.goBack){
  //           return(
  //             <Redirect to='/directory' />
  //           )
  //         }
  //         return (
  //             <div >
  //                 <AppBar
  //                     title={
  //                         <TextField id="text-field-controlled" inputStyle={this.state.title === 'Untitled Document' ? {color: 'white', fontStyle: 'italic'}: {color: 'white'}} underlineShow={false} value={this.state.title} onChange={this.onTitleEdit.bind(this)} />}
  //                     onLeftIconButtonTouchTap={this.state.saved ? this.onAlertOk.bind(this): this.onAlertOpen.bind(this)}
  //                 />
  //
  //                 <Dialog
  //                     title="Changes not saved!"
  //                     actions={actions}
  //                     modal={true}
  //                     open={this.state.alertOpen}
  //                 >You have unsaved changes! Click save to prevent your changes from being lost!</Dialog>
  //
  //
  //                 <div className="docContainer">
  //                     <div className='documentControls'>
  //                       <div>
  //                         <FlatButton label="File" onTouchTap={this.handleTouchTap.bind(this)} />
  //                         <FlatButton label="Edit" />
  //                         <FlatButton label="View" />
  //                         <FlatButton label="Help" />
  //                       </div>
  //
  //                         <Popover
  //                           open={this.state.isFileOpen}
  //                           anchorEl={this.state.anchorEl}
  //                           anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
  //                           targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
  //                           onRequestClose={this.handleRequestClose.bind(this)}
  //                           animation={PopoverAnimationVertical}
  //                           useLayerForClickAway={true}
  //                           >
  //                             <Menu onChange={this.menuSelection.bind(this)}>
  //                               <MenuItem value={1} primaryText="New"/>
  //                               <MenuItem value={2} primaryText="Open" />
  //                               <MenuItem value={3} primaryText="Save" />
  //                               <MenuItem value={4} primaryText="Close" />
  //                             </Menu>
  //                           </Popover>
  //
  //                         <div className="rightSideControls">
  //                             <span style={{display: 'flex', alignSelf: 'center'}}>Shared with:</span>
  //                             <List style={{paddingLeft: '15px', paddingRight: '10px'}}>
  //                                 {this.state.collaborators.map((user, i) => (
  //                                     <span key={i} className="collaboratorIcon" style={{backgroundColor: randomColor()}}>{user.name.slice(0,1)}</span>
  //
  //                                 ))}
  //
  //                             </List>
  //                             <RaisedButton
  //                                 label={this.state.saved ? "Saved" : "Save"}
  //                                 style={{margin: 5}}
  //                                 primary={true}
  //                                 disabled={this.state.saved}
  //                                 onTouchTap={this.onSave.bind(this)}/>
  //                         </div>

  onCollabClose() {
    this.setState({collabModalOpen: false});
  }

  onCollabOpen() {
    this.setState({collabModalOpen: true});
  }
  onTitleEdit(event) {
    this.setState({saved: false, title: event.target.value})
  }
  //called when user clicks ok and decides to not save changes
  onAlertOk() {
    this.setState({alertOpen: false, goBack: true});
    //TODO: go back to documents page
  }

  //called when user clicks cancel on alert
  onAlertClose() {
    this.setState({alertOpen: false});
  }


  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onTouchTap={this.onAlertClose.bind(this)}/>,
      <FlatButton label="Go back anyway" primary={true} onTouchTap={this.onAlertOk.bind(this)}/>]
      if (this.state.goBack){
        return(
          <Redirect to='/directory' />
        )
      }

      // socket.on('update', (data) => {
      //   const updatedState = convertFromRaw(JSON.parse(data.currentContent));
      //   this.setState({editorState: EditorState.createWithContent(updatedState)});
      //
      // });

      return (

        <div >
          <AppBar
            title={
              <TextField id="text-field-controlled" inputStyle={this.state.title === 'Untitled Document' ? {color: 'white', fontStyle: 'italic'}: {color: 'white'}} underlineShow={false} value={this.state.title} onChange={this.onTitleEdit.bind(this)} />}
              onLeftIconButtonTouchTap={this.state.saved ? this.onAlertOk.bind(this): this.onAlertOpen.bind(this)}
            />
            <Dialog
              title="Add Collaborators by email"
              modal={true}
              open={this.state.collabModalOpen}
              > <div>To add a new collaborator, type in an email and press enter</div>
              <form className="commentForm" onSubmit={this.onCollabSubmit.bind(this)}>
                <div>
                  {this.state.newCollaborators.map((collab) => <p>{collab}</p>)}
                </div>
                <input
                  type="text"
                  placeholder="collaborator"
                  value={this.state.newCollaborator}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                      e.preventDefault()
                      var updatedCollaborators = this.state.newCollaborators.concat([this.state.newCollaborator]);
                      this.setState({newCollaborator: '', newCollaborators: updatedCollaborators})
                    }
                  }}
                  onChange={(e) => this.setState({newCollaborator: e.target.value})}
                />
                <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
                  {[<FlatButton label="Cancel" primary={true} onClick={() => this.onCollabClose()}/>,
                  <FlatButton type="submit" label="Submit" primary={true}/>,
                ]}
              </div>
            </form>
          </Dialog>
          <Dialog
            title="Changes not saved!"
            actions={actions}
            modal={true}
            open={this.state.alertOpen}
            >You have unsaved changes! Click save to prevent your changes from being lost!</Dialog>


            <div className="docContainer">
              {/*  <div className='documentControls'>
              <div style={{display:'flex', flexDirection: 'row'}} > */}
              <Toolbar>
                <ToolbarGroup firstChild={true}>
                  <span style={{display: 'flex', alignSelf: 'center', flexDirection:'row'}}>Shared with:</span>
                  <List style={{paddingLeft: '15px', paddingRight: '10px'}}>
                    {this.state.collaborators.map((user, i) => (
                      <span key={i} className="collaboratorIcon" style={{backgroundColor: randomColor()}}>{'F'}</span>

                    ))}

                  </List>
                </ToolbarGroup>
                {/* </div>
                  <div className="rightSideControls"> */}
                  <ToolbarGroup lastChild={true}>
                    <RaisedButton
                      label={"add collaborators"}
                      style={{margin: 5}}
                      primary={true}
                      onTouchTap={this.onCollabOpen.bind(this)}/>
                      <RaisedButton
                        label={this.state.saved ? "Saved" : "Save"}
                        style={{margin: 5}}
                        primary={true}
                        disabled={this.state.saved}
                        onTouchTap={this.onSave.bind(this)}/>
                        <RaisedButton
                          label={this.state.autosave ? "Disable Autosave" : "Enable Autosave"}
                          style={{marginLeft: 5}}
                          primary={true}
                          onTouchTap={this.autoSave.bind(this)}/>
                        </ToolbarGroup>
                      </Toolbar>
                      {/* </div>

                      </div> */}


                      <div className="btn-toolbar editorToolbar">
                        <div className="btn-group" style={{display:"inline-block"}}>
                          <FontStyles
                            editorState={this.state.editorState}
                            onToggle={this._toggleInlineStyle.bind(this)}
                            onFontSizeIncreaseClick={() => this.onFontSizeIncreaseClick()}
                            onFontSizeDecreaseClick={() => this.onFontSizeDecreaseClick()}
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
                          customStyleMap={this.state.styleMap}
                          editorState={this.state.editorState}
                          onChange={this.onChange.bind(this)}
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
