'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dispatcher = require('./dispatcher');

var _dispatcher2 = _interopRequireDefault(_dispatcher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function combineReducers(reducers, state, action) {
  var newState = reducers.reduce(function (acc, r) {
    var projection = r.project(acc);
    return Object.assign({}, acc, r(projection, action));
  }, state);
  return newState;
}

function withState() {
  var reducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (WrappedComponent) {
    return function (_React$Component) {
      _inherits(WithState, _React$Component);

      function WithState(props) {
        _classCallCheck(this, WithState);

        var _this = _possibleConstructorReturn(this, (WithState.__proto__ || Object.getPrototypeOf(WithState)).call(this, props));

        _this.state = { innerState: initialState };
        return _this;
      }

      _createClass(WithState, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          this.regId = _dispatcher2.default.register(function (action) {
            var nextState = combineReducers(reducers, _this2.state.innerState, action);
            _this2.setState({ innerState: nextState });
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          _dispatcher2.default.unregister(this.regId);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.state.innerState, this.props));
        }
      }]);

      return WithState;
    }(_react2.default.Component);
  };
}

exports.default = withState;