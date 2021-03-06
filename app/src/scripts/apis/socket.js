export { resetCard } from './card'
export const socket = io()

export let initSocket = (send, done) => {
	socket.on('initSocket', (data = []) => {
    if (data.cards.length > 0) {
      send('app:add', { 'initSocket': true, 'cards': data.cards }, (err) => {})
    }
    send('users:update', data.users, (err) => {})
  })
}

export let resetBySocket = (send, done) => {
  socket.on('reset', (data = []) => {
    resetCard()
  })
}

export let addCardBySocket = (send, done) => {
	socket.on('add_card', (card) => {
    card.addCardBySocket = true
		send('app:add', card, (err) => {})
	})
}

export let updateUsersBySocket = (send, done) => {
  socket.on('update_users', (users = []) => {
    send('users:update', users, (err) => {})
  })
}

