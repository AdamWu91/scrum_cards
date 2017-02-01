import { addCard, resetCard } from '../apis/card'
import { socket, initSocket, resetBySocket, addCardBySocket } from '../apis/socket'

module.exports = {
  namespace: 'app',
  state: { 
  	title: 'Scrum cards',
  	selectedPoints: [],
  	selectedCards: [],
  	result: 0,
  	user: '#',
    initSocket: false
  },
  reducers: {
    add: addCard,
    reset: resetCard
  },
  subscriptions: {
  	'addCardBySocket': addCardBySocket,
    'resetBySocket': resetBySocket,
    'initSocket': initSocket
  }
}
