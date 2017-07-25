import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link  } from 'react-router-dom';
import Login from './Login'
import 'draft-js/dist/Draft.css';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleSubmit(){
    fetch('/register', {
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
      this.setState({email: '', password: ''});
      this.props.navigation.goBack();
    })
  }
  render() {
    return (
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
                    <button className="button is-success" onMouseDown={this.handleSubmit.bind(this)} >
                        <Link to='/'>Register</Link>
                    </button>
                </p>
            </div>
        </div>


                )
            }
}
