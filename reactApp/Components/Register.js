import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link  } from 'react-router-dom';
import { Redirect } from 'react-router'
import Login from './Login'
import 'draft-js/dist/Draft.css';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: ''
    };
  }
  handleSubmit(){
    fetch('http://localhost:3000/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then((response) => {
        // if(response.status === 200) {
        //     console.log('successful response');
        //     <Redirect to={'/login'}/>
        // } else {
        //     console.log('unsuccessful response should refresh with errors');
        // }
        // console.log('response in register before response.json ', response);
        return response.json()
    }
    )
    .then((resp) => {
        console.log('response json in register submit ', resp);
        if(resp)
      this.setState({name: '', email: '', password: ''});
    })
    .catch( (err) => {
        console.log('catching error in register submit ', err);
        alert(`error registering ${err}`)
    })
  }
  render() {
    return (
        <div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="text" placeholder="Full Name" value={this.state.name} onChange={(e)=> this.setState({name: e.target.value})}/>
                    <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fa fa-check"></i>
                    </span>
                </p>
            </div>
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
