import React from 'react';
import { Link, Redirect} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const baseURL = 'http://be747dfd.ngrok.io'//'http://localhost:3000'
class Directory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
      documents: [{_id:0, title:"You do not have any documents yet!", dateCreated: Date.now()}],
      value: 1,
      isOpen: false,
      isDocModalOpen: false,
      isPassModalOpen: false,
      passwordGuess: '',
      docName: '',
      docPass: '',
      newDocId: '',
      selectedDoc: {},
      loggedIn: true,
      isDocModalOpen: false,
      isPassModalOpen: false,
    }
  }

  componentWillMount(){
    console.log('user from store', this.props.store.get('user'));
    const user = this.props.store.get('user')
    this.setState({user: user})

  }

  componentDidMount() {
      this.ownedByAll()
  }
  logout(){
    fetch(baseURL+'/logout')
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      if (resp.success){
        this.props.store.delete('user');
        this.setState({
          loggedIn: false,
        })
      }
    })
    .catch((err)=>console.log(err))
  }

  filter(event, value){
    switch(value) {
      case 1:
      this.ownedByAll();
      break;
      case 2:
      this.ownedByMe();
      break;
      case 3:
      this.dateSortNew();
      break;
      case 4:
      this.dateSortOld();
      break;
      default:
      this.ownedByAll();
    }
    this.setState({value: value, isOpen: false})
  }
  dateSortNew(){
    if (this.state.documents.length > 0){
      let documents = [...this.state.documents]
      documents.sort(function(a,b){
        return new Date(parseInt(b.dateCreated)) - new Date(parseInt(a.dateCreated));
      });
      this.setState({documents: documents});
    }
  }
  dateSortOld(){
    if (this.state.documents.length > 0){
      let documents = [...this.state.documents]
      documents.sort(function(a,b){
        return new Date(parseInt(a.dateCreated)) - new Date(parseInt(b.dateCreated));
      });
      this.setState({documents: documents});
    }
  }


  ownedByAll(){
    console.log(this.state.user._id);
    fetch(baseURL+'/documents/all/'+ this.state.user._id)
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
      if (resp.documents.length > 0){
        this.setState({documents: resp.documents})
      }
    })
    .catch((err)=>console.log('error in finding all owned docuemnts', err))
  }


  ownedByMe(){
    fetch(baseURL+'/documents/owned/'+ this.state.user._id)
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
      if (resp.documents.length > 0){
        this.setState({documents: resp.documents})
      }
    })
    .catch((err)=>console.log(err))
  }
  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      isOpen: true,
      anchorEl: event.currentTarget,
      value: event.currentTarget.value,
      isDocModalOpen: false,
      isPassModalOpen: false
    });
  };
  onModalOpen(modalType){
    let stateCopy = Object.assign({}, this.state);
    stateCopy[modalType] = true;
    this.setState(stateCopy);
    console.log('this.state.modaltype',modalType, this.state, this.state[modalType]);
  };
  onModalClose(modalType){
    //   let stateCopy = Object.assign({}, this.state, {passwordGuess: ''});
      let stateCopy = Object.assign({}, this.state);
      stateCopy[modalType] = false;
      this.setState(stateCopy);
  };

  //TODO: WHAT IS THIS FOR????
  handleRequestClose(){
    this.setState({
      isOpen: false,
    });
  };

  formSubmit(e){
    e.preventDefault();
    alert('Submitted form!');
    this.modalClose();
  }

  titleChange(e){
    this.setState({
      docName: e.target.value
    })
  }

  passGuessChange(e) {
      //   let stateCopy = Object.assign({}, this.state);
      //   stateCopy[modalType] = true;
      //   this.setState(stateCopy);
      //   console.log('this.state.modaltype',modalType, this.state[modalType]);
      this.setState({
        passwordGuess: e.target.value
      })
  }
  passChange(e){
    this.setState({
      docPass: e.target.value
    })
  }

  checkPassword() {
      console.log('check password called and selcted doc is ', this.state.selectedDoc);
      if(this.state.selectedDoc.password === this.state.passwordGuess){
          var updatedSelectedDoc = Object.assign({}, this.state.selectedDoc, {userPermitted: true})
          this.setState({selectedDoc: updatedSelectedDoc})

      } else {
        console.log('this.state.selected doc is ', this.state.selectedDoc);
          alert(`incorrect the password is ${this.state.selectedDoc.password} and you inputted ${this.state.passwordGuess}`)
      }

  }
  newDocument(){
    //   this.props.store.get('userId')
    console.log('this.state.user is ', this.state.user);
    fetch(baseURL+'/documents/new/' + this.state.user._id, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: this.state.docName,
            password: this.state.docPass,
            //   collaborators: newCollaborators

        })
    })
    .then((response) => {
        return response.json()
    })
    .then((resp) => {
      this.setState({
        newDocId: resp.document._id,
        // newPassword: resp.document.password
      })
    })
    .catch((err)=>console.log('error in new document', err))
  }

  render() {

      const newDocForm = (<form className="commentForm" onSubmit={this.newDocument.bind(this)}>
          <input
              type="text"
              placeholder="Your Document Name"
              value={this.state.docName}
              onChange={this.titleChange.bind(this)}
          />
          <input
              type="password"
              placeholder="Password for Document"
              value={this.state.docPass}
              onChange={this.passChange.bind(this)}
          />

          <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
              {[<FlatButton key={700} label="Cancel" primary={true} onClick={() => this.onModalClose('isDocModalOpen')}/>,
                  <FlatButton key={800}  type="submit" label="Submit" primary={true}/>,
              ]}
          </div>
      </form>)

      const enterPasswordForm = (<form className="commentForm" onSubmit={() => this.checkPassword()}>
          <input
              type="password"
              placeholder="Password for Document"
              value={this.state.passwordGuess}
              onChange={this.passGuessChange.bind(this)}
          />

          <div style={{ textAlign: 'right', padding: 8, margin: '24px -24px -24px -24px' }}>
              {[<FlatButton key={900} label="Cancel" primary={true} onClick={() => this.onModalClose('isPassModalOpen')}/>,
                  <FlatButton key={1000} type="submit" label="Submit" primary={true}/>,
              ]}
          </div>
      </form>)

    // console.log(this.state.newDocId);
    if (this.state.newDocId){
      return (
        <Redirect to={"/editor/"+this.state.newDocId} />
      )
  }else if(this.state.selectedDoc.userPermitted){
      return (
        <Redirect to={"/editor/"+this.state.selectedDoc.id} />
      )
  }else if (!this.state.loggedIn){
      return (
        <Redirect to={'/'} />
      )
    }
    return (
      <div style={{backgroundColor: 'white', }}>

          <h1 style={{textAlign: 'center', fontSize: '40px', paddingTop: '20px'}} >Document Directory</h1>
          <h2 style={{textAlign: 'center'}} >Open document to edit or create a new one!</h2>
          <h3>{`logged in as ${this.state.user.email} with id ${this.state.user._id}`}</h3>
          <div style={{marginLeft: '5px', marginRight: '5px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <div>
                      <FloatingActionButton onTouchTap={() => this.onModalOpen('isDocModalOpen')}>
                          <ContentAdd />
                      </FloatingActionButton>
                      <Dialog
                          title="Create a New Document"
                          // actions={actions}
                          modal={false}
                          open={this.state.isDocModalOpen}
                          onRequestClose={() => this.onModalClose('isDocModalOpen')}
                      >{newDocForm}</Dialog>
                  </div>
                  {this.state.documents[0]._id!==0?<div>
                      <RaisedButton
                          onTouchTap={this.handleTouchTap.bind(this)}
                          label="Filter"
                      />
                      <Popover
                          open={this.state.isOpen}
                          anchorEl={this.state.anchorEl}
                          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                          targetOrigin={{horizontal: 'left', vertical: 'center'}}
                          onRequestClose={this.handleRequestClose.bind(this)}
                          animation={PopoverAnimationVertical}
                          useLayerForClickAway={true}
                      >
                          <Menu onChange={this.filter.bind(this)}>
                              <MenuItem value={1} primaryText="All Documents"/>
                              <MenuItem value={2} primaryText="Owned By Me" />
                              <MenuItem value={3} primaryText="Date Created" />
                              <MenuItem value={4} primaryText="Oldest" />
                          </Menu>
                      </Popover>
                      </div>: null}
                  </div>
              </div>

              {this.state.documents.map((doc, i)=>
                  <div key={i}>
                      <List>
                        {doc._id ?
                          <ListItem
                              key={i}
                              leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                              rightIcon={<ActionInfo />}
                              primaryText={doc.title}
                              // onMouseDown={(e)=>this}
                              onTouchTap={() => {
                                  var permissions = doc.password !== "" ? false : true;
                                  var selectedDoc = {password: doc.password, id: doc._id, title: doc.title, author: doc.author, collaborators: doc.collaborators, userPermitted: permissions}
                                  this.setState({selectedDoc: selectedDoc}, function(){
                                      this.onModalOpen('isPassModalOpen')
                                  })}}
                              secondaryText={new Date(parseInt(doc.dateCreated)).toLocaleString()}
                          />:
                          <div key={i} style={{textAlign: 'center'}}>You current do not have any documents...</div>}
                      </List>
                      <Divider />
                  </div>
              )}
              <Dialog
                  title="Enter Document Password:"
                  // actions={actions}
                  modal={false}
                  open={this.state.isPassModalOpen}
                  onRequestClose={() => this.onModalClose('isPassModalOpen')}
              >{enterPasswordForm}</Dialog>
              <RaisedButton label="Logout" secondary={true} onMouseDown={this.logout.bind(this)}/>
          </div>
      )
    }
  };


  export default Directory;
