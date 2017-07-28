import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { BrowserRouter, Route, Switch , Link  } from 'react-router-dom';
import { Redirect } from 'react-router'
import Login from './Login'
import 'draft-js/dist/Draft.css';
const style = {
  margin: 12,
};

const baseURL = 'https://reactgoogledocs.herokuapp.com'//'http://localhost:3000'

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      registered: false,

    };
  }
  handleSubmit(){
    fetch(baseURL+'/register', {
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
      return response.json()
    }
  )
  .then((resp) => {
    console.log('response json in register submit ', resp);
    if(resp && resp.success){
      this.props.store.set('user', resp.user);
      this.setState({name: '', email: '', password: '', registered: true,});
    }

  })
  .catch( (err) => {
    console.log('catching error in register submit ', err);
    alert(`error registering ${err}`)
  })
}
render() {
  if (this.state.registered){
    return (<Redirect to='/' />)
  }
  return (
    <div style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Paper style={{height: 400, width: 400,}} zDepth={1}>
        <h1 style={{textAlign: 'center', fontSize: '30px', paddingBottom: '10px', paddingTop:'20px'}}>Register to Use Docs</h1>
        <div style={{display:'flex', alignItems: 'center', justifyContent: 'center', paddingTop:'10px'}}>

          <TextField
            hintText="Enter your full name..."
            type="name"
            onChange={(e)=> this.setState({name: e.target.value})}
          />

        </div>
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

            <RaisedButton label="Register" secondary={true} style={style} onMouseDown={this.handleSubmit.bind(this)}/>
            <Link to="/"><RaisedButton label="Back to Login" primary={true} style={style} /></Link>

        </div>
      </Paper>
      </div>
    )
  }
}
