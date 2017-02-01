import { socket } from '../apis/socket'

export let logIn = (state, data) => {
  socket.emit('join', data)
}

export let setNick = (state, data) => {
  return { nick: data }
}