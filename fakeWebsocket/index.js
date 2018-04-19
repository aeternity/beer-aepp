var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.send('Hello')
})

let barState = 'open'

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('set_bar_state', msg => {
    barState = msg
    console.log('set_bar_state', msg)
    io.emit('bar_state', barState)
  })

  socket.on('get_bar_state', (callback) => {
    return callback(barState)
  })

  socket.on('get_beer_state', (txHash, callback) => {
    return callback({
      txHash: txHash,
      state: 0
    })
  })

  socket.on('scan', (msg, callback) => {
    console.log('scan', msg)
    // console.log('callback', callback)
    return callback({
      tx_hash: 'lel'
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

http.listen(8087, () => {
  console.log('listening on *:8087');
})
