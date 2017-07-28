import React, {Component} from 'react'
export default class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {item: props.item}
    this.toggle_button = this.toggle_button.bind(this)
    this.remove_todo = this.remove_todo.bind(this)
  }
  toggle_button(e) {
    this.setState({pending_completion: e.target.checked})
  }
  remove_todo() {
    let headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch(`/api/todos/${this.state.item._id}`, {
      method: 'DELETE',
      headers: headers
    }).then(res=> {
      this.props.itemRemoved()
      alert(`ToDo: '${this.state.item.title}' has been removed from the list`)
    }).catch(e=> {
      console.log(e)
    })
  }
  render() {
    let item = this.state.item
    let check_id = 'completed-'+item._id
    return (
      <li>
        <span className="input-group">
          <input type="checkbox" id={check_id}
            defaultChecked={item.completed} onChange={this.toggle_button}/>
            <label htmlFor={check_id}/>
        </span>
        <span ref='todo_text'>{item.title}</span>{' '}
        {this.state.pending_completion &&
          <span className="text-danger" onClick={this.remove_todo}>&times;</span>}
      </li>
    )
  }
}
