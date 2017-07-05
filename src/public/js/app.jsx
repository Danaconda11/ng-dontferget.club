import React, {Component} from 'react'
import TodoItem from './todo-item.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {todos: []}
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({todos: [
        {title: 'get eggs', completed: false},
        {title: 'research physics', completed: true},
      ]})
    }, 2000)
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
