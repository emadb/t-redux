"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var subscribers = new Map();

var dispatcher = {
  register: function register(subscriber) {
    var counter = 1;
    while (subscribers.has("s_" + counter)) {
      counter++;
    }
    var sid = "s_" + counter;
    subscribers.set(sid, subscriber);
    return sid;
  },
  unregister: function unregister(sid) {
    subscribers.delete(sid);
  },
  dispatch: function dispatch(action) {
    subscribers.forEach(function (s) {
      return s(action);
    });
  }
};

exports.default = dispatcher;