const createReducer = (reducer, projectorFn = s => s) => {
  reducer.project = projectorFn
  return reducer
}

const buildReducer = function(mapOrFn, projectorFn = s => s){
  if (typeof(mapOrFn) === 'function'){
    return createReducer(mapOrFn, projectorFn)
  } 
  const reducer = function(state, action) {
    if (action.type in mapOrFn){
      return mapOrFn[action.type](state, action)
    } 
    return state
  }
  reducer.project = projectorFn
  return reducer
}

export default buildReducer