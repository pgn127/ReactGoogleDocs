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

  componentWillMount(){
    fetch('http://localhost:3000/isLoggedIn', {credentials: 'include'})
    .then((response) => {
      return response.json()
    })
    .then((resp) => {
      console.log("pulled resp", resp);
      this.setState({loggedIn: resp.loggedIn});
    })
    .catch((err)=>console.log(err))
  }

  render() {
    console.log(this.state);
    return (
      <Router history={this.props.history}  store={this.props.store}>


        <Switch>
          {/* <Route exact path="/" component={Login}/> */}
          <Route exact path="/" render={(props) => <Login store={this.props.store}/>}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/directory/" render={(props) => <Directory store={this.props.store}/>} />
          <Route path="/editor/:docId" render={(props) => <MyEditor {...props} store={this.props.store}/>} />
          <Route path ="/" component={Login}/>
        </Switch>
      </Router>
    );
  }
};

export default Root;
