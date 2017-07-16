import React, {Component} from 'react'
import ListItem from './list-item.jsx'
export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = {list: props.list}
  }
  render () {
    return (
      <div>
        <h2>{this.state.list.title}</h2>
        <ul>
          {this.state.list.items.map(item =>
            <ListItem key={item.id} item={item}/>)}
        </ul>
      </div>
    )
  }
}
