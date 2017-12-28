import React from 'react'
import renderer from 'react-test-renderer'
import TestComponent from './fake/TestComponent'
import withState from '../lib/withState'
import dispatcher from '../lib/dispatcher'

test('withState should wrap', () => {
  const component = renderer.create(<TestComponent />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test('withState supports partial application ', () => {
  const A = ({ name }) => <div>Hello, {name}!</div>
  const B = ({ name }) => <div>Ciao, {name}!</div>

  const withName = withState([], {name: 'Dan'})

  const AWithName = withName(A)
  const BWithName = withName(B)

  let tree = renderer.create(<AWithName />).toJSON()
  expect(tree).toMatchSnapshot()

  tree = renderer.create(<BWithName />).toJSON()
  expect(tree).toMatchSnapshot()
})

test('withState should accept a pre-middleware function', () => {
  const A = ({ name }) => <div>Hello, {name}!</div>
  let done = false
  const middleware = (state, action) => { done = true }

  const Wrapped = withState([], {}, middleware)(A)
  const component = renderer.create(<Wrapped />)
  let tree = component.toJSON()

  dispatcher.dispatch({type: 'FAKE_ACTION', content: {}})

  expect(tree).toMatchSnapshot()
  expect(done).toBeTruthy()
})
