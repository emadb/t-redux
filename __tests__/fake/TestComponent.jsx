import React from 'react'
import WithState from '../../lib/WithState'

function Foo() {
  return <div>Hello</div>
}

export default WithState(Foo, [], {})

