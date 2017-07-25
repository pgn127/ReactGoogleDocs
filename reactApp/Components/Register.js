import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Link, Switch } from 'react-router-dom';
import Login from './Login'
import 'draft-js/dist/Draft.css';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  render() {
    return (
        <div>
            <div className="field">
                <p className="control has-icons-left has-icons-right">
                    <input className="input" type="email" placeholder="Email" />
                    <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                    </span>
                    <span className="icon is-small is-right">
                        <i className="fa fa-check"></i>
                    </span>
                </p>
            </div>
            
            <div className="field">
                <p className="control">
                    <button className="button is-success">
                        Register
                    </button>
                </p>
            </div>
        </div>


                )
            }
}
