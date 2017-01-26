const socket = io()
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
    add: add,
    reset: reset,
    setLogin: (state, data) => {
      console.log("SSSSSS")
      return { user: data }
    }
  },
  subscriptions: {
  	'socketAddCard': (send, done) => {
  		socket.on('add_card', (card) => {
        card.fromSocket = true
				send('app:add', card, (err) => {
					
          console.log(err)
          
				})
			})
  	},
    'resetSocket': (send, done) => {
      socket.on('reset', (data = []) => {
        console.log("resetS")
      })
    },
    'initSocket': (send, done) => {
      socket.on('initSocket', (data = []) => {
        if (data.cards.length > 0) {
          send('app:add', {'fromSocket': true, 'cards': data.cards}, (err) => {
            console.log(err)
          })
        }
      })
    }
  }
}


// Reducers
function reset() {
  socket.emit('reset')
  return {
    selectedPoints: [],
    selectedCards: [],
    result: 0
  }
}

function add(state, data) {
  var newCard = {
    user: data.user,
    point: data.point
  }
  console.log("ADD ", data)
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