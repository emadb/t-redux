const subscribers = new Map()

const dispatcher = {
  register(subscriber) {
    const sid = `s_${subscribers.size + 1}`
    subscribers.set(sid, subscriber)
    return sid
  },
  unregister(sid) {
    subscribers.delete(sid)
  },
  dispatch(action) {
    subscribers.forEach(s => s(action))
  }
}

export default dispatcher