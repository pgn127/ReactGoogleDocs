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
import {Editor, EditorState, RichUtils, ContentState, DefaultDraftBlockRenderMap, convertFromRaw, convertToRaw} from 'draft-js';
import { Map } from 'immutable';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';



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
        this.state = {
            editorState: EditorState.createEmpty(), //editorState from draftjs
            title: 'Untitled Document',
            saved: false,
            alertOpen: false,
            collaborators: [],
            currentDocument:  {},
            goBack: false,
            isFileOpen: false,
            currentUser: {
                _id: '597797018cccf651b76f25ac',
                name: 'Frankie',
                password: 'Frankie1!',
                email: 'fflores@colgate.edu'
            },
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
              }
            }
        };
        //doc id is this.props.match.params.docId
        // this.onChange = (editorState) => this.setState({editorState});
        this.focus = () => this.refs.editor.focus();
    }

    onChange(editorState) {
        this.setState({editorState: editorState, saved: false})
    }

    componentDidMount() {

      // console.log(this.props);
      // console.log(this.props.match);
      // console.log(this.props.match.params.docId);
        fetch('http://localhost:3000/documents/'+this.props.match.params.docId)
        .then((response) => {

            return response.json()
        })
        .then((resp) => {
            console.log("pulled doc", resp.document);
            //if this document has no content dont overwrite empty editorState in the state
            if(resp.document.content === ""){
              console.log('document content was empty ');
              this.setState({saved: false, currentDocument: resp.document, collaborators: resp.document.collaborators, title: resp.document.title})
            } else {
              console.log('document has an existing state');
              const contentState = convertFromRaw( JSON.parse(resp.document.content) ) ;
              var currentDocument = Object.assign({}, resp.document, {content: contentState})
              this.setState({saved: false, currentDocument: currentDocument, collaborators: currentDocument.collaborators, title: currentDocument.title, editorState: EditorState.createWithContent(contentState) })

            }
            // console.log('document collaborators ', currentDocument.collaborators);
            // this.setState({currentDocument: resp.document})
        })
        .catch((err)=>console.log('error pulling doc', err))
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
           'FONT-SIZE-' + (fontSize - 2).toString()
        ));
        this.onChange(RichUtils.toggleInlineStyle(
          this.state.editorState,
           'FONT-SIZE-' + fontSize.toString()
        ));
      });
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
        fetch('http://localhost:3000/documents/save/'+this.props.match.params.docId, {
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

    onAlertOpen() {
        this.setState({alertOpen: !this.state.saved});
        console.log('on alert open called bc this.state.saved is ', this.state.saved, 'and this.state.alertOpen ', this.state.alertOpen);
    }
    handleTouchTap(event){
      // This prevents ghost click.
      event.preventDefault();
      this.setState({
        isFileOpen: true,
        anchorEl: event.currentTarget,
        value: event.currentTarget.value,
      });
    };
    menuSelection(event, value){
      // switch(value) {
      //   case 1:
      //   this.ownedByAll();
      //   break;
      //   case 2:
      //   this.ownedByMe();
      //   break;
      //   case 3:
      //   this.dateSortNew();
      //   break;
      //   case 4:
      //   this.dateSortOld();
      //   break;
      //   default:
      //   this.ownedByAll();
      // }
      console.log(value);
    }
    handleRequestClose(){
      this.setState({
        isFileOpen: false,
      });
    };
    render() {
      console.log(this.state.saved);
        const actions = [
            <FlatButton label="Cancel" primary={true} onTouchTap={this.onAlertClose.bind(this)}/>,
              <FlatButton label="Go back anyway" primary={true} onTouchTap={this.onAlertOk.bind(this)}/>]
            if (this.state.goBack){
              return(
                <Redirect to='/directory' />
              )
            }
            return (
                <div >
                    <AppBar
                        title={
                            <TextField id="text-field-controlled" inputStyle={this.state.title === 'Untitled Document' ? {color: 'white', fontStyle: 'italic'}: {color: 'white'}} underlineShow={false} value={this.state.title} onChange={this.onTitleEdit.bind(this)} />}
                        onLeftIconButtonTouchTap={this.state.saved ? this.onAlertOk.bind(this): this.onAlertOpen.bind(this)}
                    />

                    <Dialog
                        title="Changes not saved!"
                        actions={actions}
                        modal={true}
                        open={this.state.alertOpen}
                    >You have unsaved changes! Click save to prevent your changes from being lost!</Dialog>


                    <div className="docContainer">
                        <div className='documentControls'>
                          <div>
                            <FlatButton label="File" onTouchTap={this.handleTouchTap.bind(this)} />
                            <FlatButton label="Edit" />
                            <FlatButton label="View" />
                            <FlatButton label="Help" />
                          </div>
                          
                            <Popover
                              open={this.state.isFileOpen}
                              anchorEl={this.state.anchorEl}
                              anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                              targetOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                              onRequestClose={this.handleRequestClose.bind(this)}
                              animation={PopoverAnimationVertical}
                              useLayerForClickAway={true}
                              >
                                <Menu onChange={this.menuSelection.bind(this)}>
                                  <MenuItem value={1} primaryText="New"/>
                                  <MenuItem value={2} primaryText="Open" />
                                  <MenuItem value={3} primaryText="Save" />
                                  <MenuItem value={4} primaryText="Close" />
                                </Menu>
                              </Popover>

                            <div className="rightSideControls">
                                <span style={{display: 'flex', alignSelf: 'center'}}>Shared with:</span>
                                <List style={{paddingLeft: '15px', paddingRight: '10px'}}>
                                    {this.state.collaborators.map((user, i) => (
                                        <span key={i} className="collaboratorIcon" style={{backgroundColor: randomColor()}}>{user.name.slice(0,1)}</span>

                                    ))}

                                </List>
                                <RaisedButton
                                    label={this.state.saved ? "Saved" : "Save"}
                                    style={{margin: 5}}
                                    primary={true}
                                    disabled={this.state.saved}
                                    onTouchTap={this.onSave.bind(this)}/>
                            </div>

                        </div>


                        <div className="btn-toolbar editorToolbar">
                            <div className="btn-group">
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
