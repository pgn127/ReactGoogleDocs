import React from 'react';
import ReactDOM from 'react-dom';

import { Link  } from 'react-router-dom';
import { Router, Route, Switch, Redirect} from 'react-router';
import 'draft-js/dist/Draft.css';

import Register from './Register'
import Directory from './Directory'
// import 'draft-js/dist/Draft.css';
// import 'bulma/css/bulma.css'
// import '../../build/style.css'
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

// const baseURL = 'http://be747dfd.ngrok.io'
const baseURL = 'http://localhost:3000';
const style = {
  margin: 12,
};
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedin: false,
    };
  }

  componentDidMount(){
    var storedUser = this.props.store.get('user')
    console.log("loginMount", this.props.store.get('user'));
    //TODO: make sure that this stored user is actually valid in mongodb
    if (storedUser && storedUser._id){
      console.log('Logging in');
      this.setState({
        email: storedUser.email,
        password: storedUser.password,
      }, function() {
        this.handleSubmit();
      })
    }
  }
  handleSubmit(){
    console.log(this.state);
    fetch(baseURL+'/login', {

      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => {
      console.log('response of login is ', response);
      return response.json()
    })
    .then((resp) => {
      console.log('resp.user in login response', resp.user);
      this.props.store.set('user', resp.user);
      this.setState({email: '', password: '', loggedin: true});
    })
    .catch( (err) => {
      console.log('caught error in handle submit of login ', err);
      alert(`error in handlesubmit of login ${err}`)
    })
  }
  render() {
    if (this.state.loggedin){

      console.log("BBBB1", this.props.store.get('user'));
      return(<Redirect to='/directory' />)
    }
    console.log(this.state);
    return (
      <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Paper style={{height: 350, width: 400,}} zDepth={1}>
          <h1 style={{textAlign: 'center', fontSize: '30px', paddingBottom: '20px', paddingTop:'20px'}}>Login to Docs</h1>
          <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'10px'}}>

            <TextField
              hintText="Enter your email..."
              type="email"
              onChange={(e)=> this.setState({email: e.target.value})}
            />

          </div>
          <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'10px'}}>

            <TextField
              hintText="Enter your password..."
              type="password"
              onChange={(e)=> this.setState({password: e.target.value})}
            />

          </div>
          <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop:'10px'}}>

            <RaisedButton onMouseDown={this.handleSubmit.bind(this)} primary={true} label="Login" style={style} />
            <Link to="/register"><RaisedButton label="Register" secondary={true} style={style} /></Link>

          </div>
        </Paper>
      </div>
    )
  }
}
