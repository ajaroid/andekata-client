import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login'
import App from './App'
import Dummy from './Dummy'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className='app-root'>
        <Switch>
          <Route path='/dummy' component={Dummy} />
          <Route path='/login' component={Login} />
          <Route path='/' component={App} />
        </Switch>
      </div>
    </Router>
  </Provider>
)

export default Root
