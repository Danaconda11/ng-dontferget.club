import React from 'react'
import {render} from 'react-dom'
import TodoApp from './app.jsx'
import {Router, Route} from 'react-router-dom'
import Chess from './chess.jsx'
import createBrowserHistory from 'history/createBrowserHistory'
const newHistory = createBrowserHistory()
render(
  <Router history={newHistory} >
    <div>
      <Route path="/lists" component={TodoApp}/>
      <Route path="/games/chess" component={Chess}/>
    </div>
  </Router>,
document.querySelector('#app'))
