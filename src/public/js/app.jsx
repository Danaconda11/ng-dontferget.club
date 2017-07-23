import React, {Component} from 'react'
import ListItem from './list-item.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {todos: []}
  }
  get_todos() {
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
  componentDidMount() {
    this.get_todos()
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault();
  }
  componentDidUpdate() {
    console.log(`component has updated`);
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
  render () {
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
