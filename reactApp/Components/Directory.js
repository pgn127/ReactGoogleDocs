import React from 'react';
import { Link } from 'react-router-dom';

class Directory extends React.Component {
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
    return (
      <div>
        <h1>Welcome to the Directory</h1>
        <h2>Click a document or create a new one!</h2>
        <button onMouseDown={this.logout.bind(this)}>Logout</button>
        <button onMouseDown={this.logged.bind(this)}>Check if logged in</button>
      </div>
    )
  }
};

export default Directory;
