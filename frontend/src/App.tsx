import React from 'react'
import './App.css'
import { Switch, Route, Redirect, Router } from 'react-router'
import { createBrowserHistory } from 'history'

import Login from './pages/Login'
import Register from './pages/Register'
import Shop from './pages/Shop'
import Navbar from './components/Navbar'
import authProvider from './lib/authProvider'
import Landing from './pages/Landing'
import PWForgot from './pages/PWForgot'
import PWNew from './pages/PWNew'
import ShopDetail from './pages/ShopDetail'
import { ProvideAuth } from './lib/use-auth'

function App() {
  const history = createBrowserHistory()

  const dataClick = function () {
    console.log('dataclick in app.tsx')
  }
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Landing} exact />
          <Route path="/shop/:shopId" component={Shop} exact />
          <ProvideAuth>
            <Navbar onButtonClick={dataClick} />
            <Route path="/password-reset" component={PWForgot} exact />
            <Route path="/password-setnew" component={PWNew} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/login" component={Login} exact />
            <Route
              path="/shop-detail/:shopId"
              authProvider={authProvider}
              component={ShopDetail}
              exact
            />
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
