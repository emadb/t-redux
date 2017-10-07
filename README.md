## T-Redux

This is a mini library that implements the Redux pattern.
Useful if you don't need all the stuff that the redux framework gives you.

### How to use it
1) Install the library
  ```
  npm install t-redux
  ```

2) Import in your files
  ```
  import {withState, dispatcher, buildReducer} from 't-redux'
  ```

3) What you get is
  - A High Order Component to wrap your React components
  - An action dispatcher
  - An utility function to build the reducers

### One file example

  ```javascript
    // import the needed modules
    import {withState, dispatcher, buildReducer} from 't-redux'

    // this is a PORC (Plain Old React Component)
    class MyCounter extends React.Component {
      constructor() {
        super()
        this.plusOne = this.plusOne.bind(this)
      }
      plusOne() {
        // Dispacth the action (the content is optional)
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
    // Build the reducers as a map ACTION:(state, action) => state
    const reducers = buildReducer({
      'PLUS_ONE': (state, action) => ({counter: state.counter + 1})
    })

    // Define the initial state
    const INITIAL_STATE = { counter: 0 }

    // export the wrapped component passing the reducers and the initial state
    export default withState([reducers], INITIAL_STATE)(MyCounter)
  ```

### API

#### `buildReducer(map)`
Build the reducers map. The map is composed by an action type and a reducer function. The reducer function is  f: (state, action) -> state
The state is changed applying the action type reducer.

#### `dispatcher`
Is an object with three methods:
##### `register(fn)`
Register the function fn in the list of subscribed functions. Returns the id of the registered entry.
##### `unregister(id)`
Remove the function from the list of subscribers.
##### `dispatch(action)`
Call every subscribed functions passing the action

#### `withState(reducers, initialState)`
Connect the magic. Returns a function that it can be used to connect a component with the reducers and the initial state.


### Why
This package was born while I was learning react and redux. I love the principles behind Redux but I don't like boilerplate and overcomplicated code so I decided to try to write a simple implementation of the redux pattern.
Feel free to use it or to continue to use the [Real One](https://github.com/reactjs/redux).
[Michele Bertoli](https://github.com/MicheleBertoli) gave a [terrific presentation](https://speakerdeck.com/michelebertoli/setstate-ftw) on how to manage state in react applications. `t-redux` is one of the available options.
