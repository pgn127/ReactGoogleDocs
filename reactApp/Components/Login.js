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
  handleSubmit(){
    console.log("in submit");
    fetch('http://localhost:3000/login', {
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
      this.setState({email: '', password: '', loggedin: true, user: resp.user});
    })
  }
  render() {
    return (
      <div>
              {this.state.loggedin ? <Directory user={this.state.user}/>:
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
                    <p className="control">
                        <button className="button is-success" onMouseDown={this.handleSubmit.bind(this)}>
                            Login
                            {/* Login */}
                        </button>
                        <Link to="/directory"> hey </Link>
                    </p>
                </div>
              </div>}

</div>

                )
            }
}
