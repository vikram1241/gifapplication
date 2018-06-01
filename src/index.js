import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/App';
// import request from 'superagent';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('root')
);
