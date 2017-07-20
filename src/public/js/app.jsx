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
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  addTodo() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({title: this.state.value, completed: false}),
      headers: headers
    }).then(()=> {
      console.log('API call completed')
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
        {this.state.lists.map(list => <List key={list.id} list={list}/>)}
        <a href='/account'>view account</a>
      </div>
    )
  }
}
