import React from 'react';
import ReactDOM from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import App from './components/App';
import GifView from './components/GifCollection';
import Favourites from './components/FavouriteGif';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={GifView} />
        <Route path="/favourites" component={Favourites} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);
