'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var createReducer = function createReducer(reducer) {
  var projectorFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (s) {
    return s;
  };

  reducer.project = projectorFn;
  return reducer;
};

var buildReducer = function buildReducer(mapOrFn) {
  var projectorFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (s) {
    return s;
  };

  if (typeof mapOrFn === 'function') {
    return createReducer(mapOrFn, projectorFn);
  }
  var reducer = function reducer(state, action) {
    if (action.type in mapOrFn) {
      return mapOrFn[action.type](state, action);
    }
    return state;
  };
  reducer.project = projectorFn;
  return reducer;
};

exports.default = buildReducer;