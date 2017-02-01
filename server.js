const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require("path")

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})
app.get('/cards', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html')
})

let selectedCards = [],
    selectedPoints = [],
    result = 0,
    users = {}

io.on('connect', (socket) => {
    socket.emit('initSocket', { cards: selectedCards, users: users});
});

io.on('connection', (socket) => {
  socket.on('join', (name) => {
    users[socket.id] = name
    socket.broadcast.emit('update_users', users)
  })

  socket.on('add_card', (card) => {
    console.log("socket")
  	selectedCards.push(card)
    selectedPoints.push(card.point)
    result = Math.max(...selectedPoints)
  	socket.broadcast.emit('add_card', card)
  })

  socket.on('reset', (card) => {
    selectedCards= []
    selectedPoints = []
    result = 0
    socket.broadcast.emit('reset', [])
  })

  socket.on("disconnect", () => {
    delete users[socket.id];
    socket.broadcast.emit('update_users', users)
  })

})


app.use('/static', express.static(path.join(__dirname, 'dist')))

http.listen(3000, () => {
  console.log('listening on *:3000')
})