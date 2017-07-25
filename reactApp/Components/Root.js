import React from 'react';
// import { BrowserRouter, Route, Switch , Link  } from 'react-router-dom';
import { Router, Route, Switch } from 'react-router';
import Login from './Login.js'
import Directory from './Directory';
import MyEditor from './MyEditor'
import Register from './Register.js'

class Root extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }
  // function requireAuth(nextState, replace) {
  //   if (!loggedIn()) {
  //     replace({
  //       pathname: '/login'
  //     })
  //   }
  // }


  authenticateUser() {
    //takes username and password, returns true for valid or false
  }
  render() {

    return (
      <Router history={this.props.history}  >
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </Switch>
      </Router>
    );
  }
};

export default Root;
