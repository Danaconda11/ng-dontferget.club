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
    fetch('/api/todos', {
      method: 'DELETE',
      body: JSON.stringify({title: this.refs.todo_title.innerHTML})
    }).then(res=> {
      console.log(`back in component`, res)
    }).catch(e=> {
      console.log(e)
    })
  }
  complete_todo(){
    if(!this.state.pending_completion) {
      return null
    }
    return <button onClick={()=> this.remove_todo()}>Remove</button>
  }
  render() {
    let confirm_button = this.complete_todo()
    return (
      <li>
        <input type="checkbox" defaultChecked={this.state.item.completed} onClick={(e)=> this.make_button(e)}/>
        <span ref='todo_title'>{this.state.item.title}</span>
        {confirm_button}
      </li>
    )
  }
}
