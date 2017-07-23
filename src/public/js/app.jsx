import React, {Component} from 'react'
import ListItem from './list-item.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {todos: []}
  }
  componentDidMount() {
    fetch('/api/todos')
      .then(res=> {
        return res.json()
      }).then(todos=> {
        console.log(`todos`, todos)
        console.log(`todos typeof`, typeof(todos))
        this.setState({todos: todos})
      }).catch(e=> {
        console.log(e)
      })
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  addTodo() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({title: this.state.value, completed: false}),
      headers: headers
    }).catch(err=> {
      console.log(err)
    })
  }
  render () {
    console.log('this.state.todos in render', this.state.todos)
    return (
      <div>
        <form onSubmit={e=> this.handleSubmit(e)}>
          <input id='todo_input' placeholder='Add a list' onChange={e=> this.handleChange(e)}/>
          <button id='add' onClick={()=> this.addTodo()}>add</button>
        </form>
        <h1>To do</h1>
        <ul>
        {this.state.todos.map(item => <ListItem key={item._id} item={item}/>)}
        </ul>
        <a href='/account'>view account</a>
      </div>
    )
  }
}
