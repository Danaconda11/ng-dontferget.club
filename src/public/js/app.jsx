import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ListItem from './list-item.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {todos: []}
    this.get_todos = this.get_todos.bind(this)
    this.on_change = this.on_change.bind(this)
    this.on_submit = this.on_submit.bind(this)
  }
  get_todos () {
    fetch('/api/todos')
      .then(res=> {
        return res.json()
      }).then(todos=> {
        this.setState({todos: todos})
      }).catch(e=> {
        console.log(e)
      })
  }
  componentDidMount () {
    this.get_todos()
  }
  on_change (event) {
    this.setState({value: event.target.value})
  }
  on_submit (event) {
    event.preventDefault()
    this.refs.todo_input.value = ''
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({title: this.state.value, completed: false}),
      headers,
    }).then(()=> {
      this.get_todos()
    }).catch(err=> {
      console.error(err)
    })
  }
  render () {
    return (
      <div>
        <h1>To do</h1>
        <form onSubmit={this.on_submit} className="new_todo">
          <input ref='todo_input' placeholder='Add a todo'
            onChange={this.on_change} autoFocus={true}/>
          <button className="primary">&#43;</button>
        </form>
        <ul className="todo_items">
        {this.state.todos.map(item =>
          <ListItem itemRemoved={this.get_todos} key={item._id} item={item}/>)}
        </ul>
        <Link to='/account'>view account</Link>
      </div>
    )
  }
}
