import React from 'react'
import {render} from 'react-dom'
import TodoApp from './app.jsx'
import {Router, Route} from 'react-router-dom'
import Chess from './chess.jsx'
import Account from './account.jsx'
import createBrowserHistory from 'history/createBrowserHistory'

let newHistory = createBrowserHistory()
let app =
<Router history={newHistory}>
  <div className="app">
    <Route path="/lists" component={TodoApp}/>
    <Route path="/games/chess" component={Chess}/>
    <Route path="/account" component={Account}/>
  </div>
</Router>
render(app, document.querySelector('#app'))
