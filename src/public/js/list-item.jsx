import React, {Component} from 'react'
import keys from './keys'

export default class ListItem extends Component {
  constructor (props) {
    super(props)
    this.state = {item: props.item, edit: false}
    this.toggle_button = this.toggle_button.bind(this)
    this.edit_title = this.edit_title.bind(this)
    this.save_title = this.save_title.bind(this)
    this.cancel_edit = this.cancel_edit.bind(this)
  }
  edit_title (e) { this.setState({edit: true}) }
  cancel_edit (e) {
    if (e.keyCode === keys.ESCAPE) {
      this.setState({edit: false})
    }
    if (e.keyCode === keys.ENTER) {
      this.save_title(e)
    }
  }
  componentDidUpdate (e) {
    if (this.state.edit) {
      this.refs.edit_todo_title.select()
    }
  }
  toggle_button (e) {
    let item = this.state.item
    item.completed = e.target.checked
    this.setState({pending_completion: item.completed, item})
  }
  save_title (e) {
    let item = this.state.item
    item.title = e.target.value
    this.setState({edit: false, item})
  }
  render () {
    let item = this.state.item
    let check_id = 'completed-'+item._id
    let edit_mode = this.state.edit
    return (
      <li className={'todo_item' + (item.completed ? ' completed' : '')}>
        <span className="input-group">
          <input type="checkbox" id={check_id}
            defaultChecked={item.completed} onChange={this.toggle_button}/>
            <label htmlFor={check_id}/>
        </span>
        {!edit_mode && <span className="clickable" onClick={this.edit_title}>
          {item.title}</span>}
        {edit_mode &&
          <input ref="edit_todo_title" onBlur={this.save_title}
            onKeyDown={this.cancel_edit}
            defaultValue={item.title}/>}
      </li>
    )
  }
}
