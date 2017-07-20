import React, {Component} from 'react'
import List from './list.jsx'
export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {lists: []}
  }
  componentDidMount () {
    fetch('/api/lists')
      .then(res=> {
        return res.json()
      }).then(lists=> {
        this.setState({lists})
      }).catch(e=> {
        console.log(e)
      })
  }
  addTodo() {
    var todo = document.getElementById('todo_input').value
    fetch('/add_todo', {
      method: 'POST',
      body: {
        title: todo,
        completed: false
      }
    }).then(()=> {
      console.log('API call completed')
    })
  }
  render () {
    return (
      <div>
        <input id='todo_input' placeholder="Add a list"/>
        <button id='add' onClick={this.addTodo}>add</button>
        <h1>To do</h1>
        {this.state.lists.map(list => <List key={list.id} list={list}/>)}
        <a href="/account">view account</a>
      </div>
    )
  }
}
