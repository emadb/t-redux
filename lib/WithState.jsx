import React from 'react'
import dispatcher from './dispatcher'

function combineReducers(reducers, state, action){
  const newState = reducers.reduce((acc, r) => {
    const projection = r.project(acc)
    return Object.assign({}, acc, r(projection, action))  
  }, state)
  return newState
}

function WithState(WrappedComponent, reducers = [], initialState = {}) {
  return class withState extends React.Component {
    constructor(props) {
      super(props)
      this.state = { innerState: initialState }
    }

    componentWillMount() {
      this.regId = dispatcher.register(action => {
        const nextState = combineReducers(reducers, this.state.innerState, action)
        this.setState({innerState: nextState})
      })
    }
    componentWillUnmount() {
      dispatcher.unregister(this.regId)
    }
    render() {
      return <WrappedComponent {...this.state.innerState} {...this.props} />
    }
  }
}

export default WithState