import dispatcher from '../lib/dispatcher'

test('dispatch the action', done => {
  dispatcher.register(action => {
    expect(action.type).toBe('FOO')
    expect(action.content.bar).toBe(42)
    done()
  })
  dispatcher.dispatch({type: 'FOO', content: {bar: 42}})
})

test('unregister', done => {
  const id = dispatcher.register(action => {
    throw new Error('You should not be here')
  })
  dispatcher.unregister(id)
  dispatcher.dispatch({type: 'FOO', content: {bar: 42}})
  setTimeout(function(){ done() }, 10)
})