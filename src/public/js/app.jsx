import React, {Component} from 'react'
import TodoItem from './todo-item.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {todos: []}
  }
  componentDidMount () {
    fetch('/api/todos')
      .then(res=> {
        return res.json()
      }).then(todos=> {
        this.setState({todos})
      }).catch(e=> {
        console.log(e)
      })
  }
  render () {
    return (
      <div>
        <input placeholder="Add a todo"/>
        <h2>To do</h2>
        {this.state.todos.map(todo => <TodoItem item={todo}/>)}
        <a href="/account">view account</a>
      </div>
    )
  }
}
