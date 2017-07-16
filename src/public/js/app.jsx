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
  render () {
    return (
      <div>
        <input placeholder="Add a list"/>
        <h1>To do</h1>
        {this.state.lists.map(list => <List key={list.id} list={list}/>)}
        <a href="/account">view account</a>
      </div>
    )
  }
}
