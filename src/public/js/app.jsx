import React, {Component} from 'react'
import List from './list.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {lists: []}
  }
  componentDidMount() {
    fetch('/api/todos')
      .then(res=> {
        return res.json()
      }).then(lists=> {
        console.log(`lists`, lists)
        console.log(`lists typeof`, typeof(lists))
        this.setState({lists})
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
    console.log('this.state.lists in render', this.state.lists)
    return (
      <div>
        <form onSubmit={e=> this.handleSubmit(e)}>
          <input id='todo_input' placeholder='Add a list' onChange={e=> this.handleChange(e)}/>
          <button id='add' onClick={()=> this.addTodo()}>add</button>
        </form>
        <h1>To do</h1>
        {this.state.lists.map(list => <List key={list._id} list={list}/>)}
        <a href='/account'>view account</a>
      </div>
    )
  }
}
