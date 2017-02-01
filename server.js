const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require("path")

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html')
})

let selectedCards = [],
    selectedPoints = [],
    result = 0

io.on('connect', function (socket) {
    socket.emit('initSocket', { cards: selectedCards});
});

io.on('connection', function(socket){
  // console.log('a user connected');
  // socket.on('disconnect', function(){
  //   console.log('user disconnected');
  // });
  socket.on('add_card', function(card){
    console.log("socket")
  	selectedCards.push(card)
    selectedPoints.push(card.point)
    result = Math.max(...selectedPoints)
  	socket.broadcast.emit('add_card', card)
  });

  socket.on('reset', function(card){
    selectedCards= []
    selectedPoints = []
    result = 0
    socket.broadcast.emit('reset', [])
  });



  
});

app.use('/static', express.static(path.join(__dirname, 'dist')))

http.listen(3000, function(){
  console.log('listening on *:3000')
})