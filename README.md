## T-Redux

This is a mini library that implements the Redux pattern.
Useful if you don't need all the stuff that the redux framework gives you.

### How to use it
1) Install the library
  ```
  npm install mini-redux
  ```

2) Import in your files
  ```
  import {WithState, dispatcher, buildReducer} from 't-redux'
  ```

3) What you get is
  - A High Order Component to wrap your React components
  - An action dispatcher 
  - An utility function to build the reducers

### One file example

  ```javascript
    // import the needed modules
    import {WithState, dispatcher, buildReducer} from 't-redux'

    // this is a PORC (Plain Old React Component)
    class MyCounter extends React.Component {
      plusOne() {
        // Dispacth the action (the content is optional)
        dispatcher.dispatch({type: 'PLUS_ONE', content: this.props.counter})
      }
      render() {
        return <div>
            <div>Click count: {this.props.counter}</div>
            <button onClick={this.plusOne}>Add 1</button>
          </div>
      }
    }
    // Build the reducers as a map ACTION:(state, action) => state
    const reducers = buildReducer({
      'PLUS_ONE': (state, action) => ({counter: state.counter + 1})
    })

    // Define the initial state
    const INITIAL_STATE = { counter: 0 }

    // export the wrapped component passing the reducers and the initial state1
    export default WithState(MyCounter, [reducers], INITIAL_STATE)
  ```

### Why
This package was born while I was learning react and redux. I love the principles behind Redux but I don't like boilerplate and overcomplicated code so I decided to try to write a simple implementation of the redux principles.
Feel free to use it or to continue to use the [Real One](https://github.com/reactjs/redux).