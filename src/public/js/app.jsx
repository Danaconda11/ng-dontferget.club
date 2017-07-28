import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ListItem from './list-item.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {todos: []}
    this.get_todos = this.get_todos.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }
  get_todos() {
    fetch('/api/todos')
      .then(res=> {
        return res.json()
      }).then(todos=> {
        this.setState({todos: todos})
      }).catch(e=> {
        console.log(e)
      })
  }
  componentDidMount() {
    this.get_todos()
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.refs.todo_input.value = ''
    this.addTodo()
  }
  componentDidUpdate() {
    console.log(`component updated`);
  }
  addTodo() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({title: this.state.value, completed: false}),
      headers: headers
    }).then(()=> {
      this.get_todos()
    }).catch(err=> {
      console.log(err)
    })
  }
  render() {
    return (
      <div>
        <h1>To do</h1>
        <form onSubmit={this.handleSubmit} className="new-todo">
          <input ref='todo_input' placeholder='Add a todo' onChange={this.handleChange}
            autoFocus={true}/>
          <button className="primary">&#43;</button>
        </form>
        <ul>
        {this.state.todos.map(item => <ListItem itemRemoved={this.get_todos} key={item._id} item={item}/>)}
        </ul>
        <Link to='/account'>view account</Link>
      </div>
    )
  }
}
