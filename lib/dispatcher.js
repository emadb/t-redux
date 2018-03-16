const subscribers = new Map()

const dispatcher = {
  register(subscriber) {
    let counter = 1
    while(subscribers.has(`s_${counter}`)){
      counter++;
    }
    const sid = `s_${counter}`
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