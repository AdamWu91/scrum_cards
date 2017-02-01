export const socket = io()

export let initSocket = (send, done) => {
	socket.on('initSocket', (data = []) => {
    if (data.cards.length > 0) {
      send('app:add', { 'fromSocket': true, 'cards': data.cards }, (err) => {})
    }
  })
}

export let resetBySocket = (send, done) => {
  socket.on('reset', (data = []) => {})
}

export let addCardBySocket = (send, done) => {
	socket.on('add_card', (card) => {
    card.fromSocket = true
		send('app:add', card, (err) => {})
	})
}

