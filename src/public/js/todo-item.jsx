import React, {Component} from 'react'
export default class TodoItem extends Component {
  constructor (props) {
    super(props)
    this.state = {item: props.item}
  }
  render () {
    return (
      <div>
        <input type="checkbox" checked={this.state.item.completed}/>
        <span>{this.state.item.title}</span>
      </div>
    )
  }
}
