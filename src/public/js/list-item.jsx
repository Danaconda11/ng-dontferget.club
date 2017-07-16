import React, {Component} from 'react'
export default class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {item: props.item}
  }
  render () {
    return (
      <li>
        <input type="checkbox" checked={this.state.item.completed}/>
        <span>{this.state.item.title}</span>
      </li>
    )
  }
}
