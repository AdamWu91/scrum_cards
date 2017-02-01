import { socket } from '../apis/socket'

export let resetCard = () => {
  socket.emit('reset')
  return {
    selectedPoints: [],
    selectedCards: [],
    result: 0
  }
}

export let addCard = (state, data) => {
  let newCard = {
    user: data.user,
    point: data.point
  }
  if (!data.fromSocket) {
  	socket.emit('add_card', newCard)
  }
  if (data.cards) {
    state.initSocket = true
    data.cards.forEach((el) => {
      state.selectedCards.push(el)
      state.selectedPoints.push(el.point)
    })
  } else {
    state.selectedCards.push(newCard)
    state.selectedPoints.push(newCard.point)
  }
  return {
    selectedPoints: state.selectedPoints,
    result: Math.max(...state.selectedPoints),
    'initSocket': state.initSocket
  }
}
