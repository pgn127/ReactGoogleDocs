import React from 'react';
import { Link } from 'react-router-dom';

class Directory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fakeDoc: ''
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
    fetch('http://localhost:3000/isLoggedIn')
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
    })
    .catch((err)=>console.log(err))
  }

  

  render() {
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

export default Directory;
