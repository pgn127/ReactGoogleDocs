import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch , Link  } from 'react-router-dom';
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
                <p className="control has-icons-left">
                    <input className="input" type="password" placeholder="Password" />
                    <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button className="button is-success" >
                        <Link to='/login'>Register</Link>
                    </button>
                </p>
            </div>
        </div>


                )
            }
}
