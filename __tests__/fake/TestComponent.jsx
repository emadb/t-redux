import React from 'react'
import withState from '../../lib/withState'

function Foo() {
  return <div>Hello</div>
}

export default withState(Foo, [], {})
