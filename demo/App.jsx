import ReactDOM from 'react-dom'
import React from 'react'
import {Component} from 'react'
import buildReducer from '../lib/buildReducer'
import withState from '../lib/withState'
import dispatcher from '../lib/dispatcher'

class MyCounter extends React.Component {
  constructor() {
    super()
    this.plusOne = this.plusOne.bind(this)
  }
  plusOne() {
    dispatcher.dispatch({type: 'PLUS_ONE', content: this.props.counter})
  }
  render() {
    return (
      <div>
        <div>Click count: {this.props.counter}</div>
        <button onClick={this.plusOne}>Add 1</button>
      </div>)
  }
}

const reducers = buildReducer({
  'PLUS_ONE': (state, action) => ({counter: state.counter + 1})
})

const INITIAL_STATE = { counter: 0 }

const App = withState([reducers], INITIAL_STATE)(MyCounter)



ReactDOM.render(<App />, document.getElementById('app'))