import React from 'react';
import { Link } from 'react-router-dom';
//import MobileTearSheet from '../../../MobileTearSheet';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class Directory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fakeUser: {
        _id: '597797018cccf651b76f25ac',
        name: 'Frankie',
        password: 'Frankie1!',
        email: 'fflores@colgate.edu',
      },
      documents: [],
      value: 1,
    }
  }
  logout(){
    fetch('http://localhost:3000/logout')
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      if (resp.success){

      }
    })
    .catch((err)=>console.log(err))
  }

  logged(){
    fetch('http://localhost:3000/isLoggedIn', {credentials: 'include'})
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
    })
    .catch((err)=>console.log(err))
  }
  componentDidMount(){
    this.ownedByAll()
  }
  filter(event, index, value){
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
    this.setState({value})
  }
  dateSortNew(){
    let documents = [...this.state.documents]

    documents.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(parseInt(b.dateCreated)) - new Date(parseInt(a.dateCreated));
    });
    this.setState({documents: documents});
  }
  dateSortOld(){
    let documents = [...this.state.documents]

    documents.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(parseInt(a.dateCreated)) - new Date(parseInt(b.dateCreated));
    });
    this.setState({documents: documents});
  }
  ownedByAll(){
    fetch('http://localhost:3000/documents/all/'+ this.state.fakeUser._id)
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
      this.setState({documents: resp.documents})
    })
    .catch((err)=>console.log(err))
  }
  ownedByMe(){
    fetch('http://localhost:3000/documents/owned/'+ this.state.fakeUser._id)
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
      this.setState({documents: resp.documents})
    })
    .catch((err)=>console.log(err))
  }



  render() {
<<<<<<< HEAD
      const testDoc = {
          content: "",
          _id: "5977add188553348069400e1",
          author: "597797018cccf651b76f25ac",
          shareLink: "sharelink.com",
          dateCreated: "1501015505230",
          collaborators: [
            "597797018cccf651b76f25ac"
          ],
          title: "updatedtitle"
      }
    return (
      <div>
          <h1>Welcome to the Directory</h1>
          <h2>Click a document or create a new one!</h2>
          <div>
              Click to see document
          </div>
          <button onMouseDown={this.fakeDocClick.bind(this)}>Click fake doc</button>
          <button onMouseDown={this.logout.bind(this)}>Logout</button>
        <button onMouseDown={this.logged.bind(this)}>Check if logged in</button>
      </div>
    )
  }
};
=======
    console.log(this.state);

    return (
      <div>
        <h1 style={{textAlign: 'center'}} >Document Directory</h1>
        <h2 style={{textAlign: 'center'}} >Open document to edit or create a new one!</h2>
        <div>
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
          <div className="align-right">
            <div>
              Filter By:

              <DropDownMenu
                value={this.state.value}
                onChange={this.filter.bind(this)}
                className="customWidth"
                autoWidth={false}
                >
                  <MenuItem value={1} primaryText="All Documents" />
                  <MenuItem value={2} primaryText="Owned By Me" />
                  <MenuItem value={3} primaryText="Date Created" />
                  <MenuItem value={4} primaryText="Oldest" />
                </DropDownMenu>
              </div>
            </div>

            {this.state.documents.map((doc, i)=>
              <div>
                <List>
                  <ListItem
                    key={i}
                    leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                    rightIcon={<ActionInfo />}
                    primaryText={doc.title}
                    secondaryText={new Date(parseInt(doc.dateCreated)).toLocaleString()}
                  />
                </List>
                <Divider />
              </div>

            )}

          </div>
          <button onMouseDown={this.logout.bind(this)}>Logout</button>
          <button onMouseDown={this.logged.bind(this)}>Test to Check if logged in</button>
        </div>
      )
    }
  };
>>>>>>> fb81157a0a3164c43c769050b675fd7b1bc1b0e3

  export default Directory;
