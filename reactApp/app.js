/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import Root from './Components/Root.js'
import createHashHistory from 'history/createHashHistory';
import MyEditor from './Components/MyEditor.js'
import Login from './Components/Login.js'
import {Editor, EditorState} from 'draft-js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'bulma/css/bulma.css'
import 'draft-js/dist/Draft.css';

import '../build/style.css'
// import 'css/materialdesignicons.min.css'
// import 'font-awesome/css/font-awesome.css'


const history = createHashHistory();

const App = () => (
  <MuiThemeProvider>
      <MyEditor />
  </MuiThemeProvider>
);

ReactDOM.render(

  <MuiThemeProvider>
    <Root history={history}/>
  </MuiThemeProvider>,

  //<App />,

  document.getElementById('root')
);
