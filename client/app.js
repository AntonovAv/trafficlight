import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import configureStore from './store'

import App from 'containers/App'
import Home from 'containers/Home'
import Settings from 'containers/Settings'
import Audio from 'containers/Audio'

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router
      history={browserHistory}
    >
      <Route path='/' component={App}>
        <IndexRedirect to='/home'/>
        <Route path='home' component={Home}/>
        <Route path='settings' component={Settings}/>
        <Route path='audio' component={Audio}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
