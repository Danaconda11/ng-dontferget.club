import React, {Component} from 'react'
import TodoItem from './todo-item.jsx'
export default class Todo extends Component {
  constructor (props) {
    super(props)
    this.state = {todos: [
      {title: 'get eggs', completed: false},
      {title: 'research physics', completed: true},
    ]}
  }
  render () {
    return (
      <div>
        <input placeholder="Add a todo"/>
        <h2>To do</h2>
        {this.state.todos.map(todo => <TodoItem item={todo}/>)}
      </div>
    )
  }
}
