const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require("path")

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist/index.html')
})

let selectedCardsPoints = []

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('move_card', function(params){
  	selectedCardsPoints.push(params.points)
  	io.emit('update_cards', {'cardId': params.points, 'points': Math.max(...selectedCardsPoints)})
  });
  socket.on('reset', function(params){
  	io.emit('update_cards', {'cardId': null,'points': 0, 'type': 'reset'})
  });
  
});

app.use('/static', express.static(path.join(__dirname, 'dist')))

http.listen(3000, function(){
  console.log('listening on *:3000')
})