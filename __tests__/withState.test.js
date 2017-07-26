import React from 'react'
import renderer from 'react-test-renderer'
import TestComponent from './fake/TestComponent'
import withState from '../lib/withState'

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
