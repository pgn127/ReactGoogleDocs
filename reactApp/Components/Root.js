import React from 'react';
import { BrowserRouter, Route, Switch , Link  } from 'react-router-dom';
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
      <BrowserRouter>
        <div>
          {/* <Route path='/directory' render={() => <Link to={'/'}>Back to Home</Link>} /> */}
          {/* In a Switch, only the 1st matched route renders.*/}
          {/* {this.state.loggedIn ? <MyEditor /> : <Login />} */}
          {/* <Switch> */}
            {/* <Route path="/" component={Login}> */}

            {/* <Switch> */}
              <Route path="/" component={Login} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/directory" component={Directory} />
            {/* </Route> */}

            {/* A route with no path is matched unconditionally.*/}
            <Route render={() => <h1>404</h1>} />
          {/* </Switch> */}
        </div>
      </BrowserRouter>
    );
  }
};

export default Root;
