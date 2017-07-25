import buildReducer from '../lib/buildReducer'

test('should return a funtion', () => {
  const reducer = buildReducer({
    'FOO_ACTION': (s, a) => s
  })
  expect(typeof (reducer)).toEqual('function')
})

test('can receive a function', () => {
  const reducer = buildReducer(function(state, action){ 
    return state
  })
  expect(typeof (reducer)).toEqual('function')
})