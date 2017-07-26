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
      user: {}
    };

  }

  componentDidMount(){
    if (this.props.store.get('userId')){
      this.setState({
        loggedin:true,
      })
    }
  }
  handleSubmit(){
    console.log("in submit");
    fetch('http://localhost:3000/login', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((resp) => {
      console.log(resp.user);
      this.props.store.set('userId', resp.user._id);
      this.setState({email: '', password: '', loggedin: true, user: resp.user});
    })
  }
  render() {
    if (this.state.loggedin){
      return(<Redirect to='/directory' />)
    }
    return (
      <div>
        {/* {this.state.loggedin ? <Directory user={this.state.user}/>: */}
        <AppBar title='Docs'/>
        {' '}
        <br />
        <div>
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={(e)=> this.setState({email: e.target.value})}/>
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fa fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={(e)=> this.setState({password: e.target.value})}/>
              <span className="icon is-small is-left">
                <i className="fa fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control" style={{textAlign: 'center'}}>
              {/* <button className="button is-success" onMouseDown={this.handleSubmit.bind(this)}>
                Login
              </button>
              <Link className="button is-success" to="/register">Register</Link> */}
              <RaisedButton onMouseDown={this.handleSubmit.bind(this)} label="Login" style={style} />
              <br />
              <Link to="/register"><RaisedButton label="Register" style={style} /></Link>
            </p>
          </div>
        </div>

      </div>

    )
  }
}
