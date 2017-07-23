import React, {Component} from 'react'
export default class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {item: props.item}
  }
  make_button(e) {
    this.setState({pending_completion: e.target.checked})
  }
  remove_todo() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    let todo_id = this.state.item._id
    fetch('/api/todos', {
      method: 'DELETE',
      body: JSON.stringify({_id: todo_id}),
      headers: headers
    }).then(res=> {
      this.props.parentMethod()
      alert(`ToDo: '${his.state.item.title}' has been removed from the list`)
    }).catch(e=> {
      console.log(e)
    })
  }
  complete_todo() {
    return this.state.pending_completion ? <button onClick={()=> this.remove_todo()}>Remove</button> : null
  }
  render() {
    let confirm_button = this.complete_todo()
    return (
      <li>
        <input type="checkbox" defaultChecked={this.state.item.completed} onClick={(e)=> this.make_button(e)}/>
        <span ref='todo_text'>{this.state.item.title}</span>
        {confirm_button}
      </li>
    )
  }
}
