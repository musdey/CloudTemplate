import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import './App.css'
import { Switch, Route, Redirect, Router } from 'react-router'
import { createBrowserHistory } from 'history'

import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import PWForgot from './pages/PWForgot'
import PWNew from './pages/PWNew'
import { ProvideAuth } from './lib/use-auth'

function App() {
  const history = createBrowserHistory()

  return (
    <div className="App">
      <Router history={history}>
        <Navbar></Navbar>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Landing} exact />
          <ProvideAuth>
            <Route path="/password-reset" component={PWForgot} exact />
            <Route path="/password-setnew" component={PWNew} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
          </ProvideAuth>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
