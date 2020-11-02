const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
// const port = 3000



io.on('connection', client => {
    client.emit('blah') 

    client.on('newGame', handleNewGame);
    client.on('joinGame', handleJoinGame);


    let clientRooms = {}

    function handleJoinGame(roomName) {
        console.log(roomName)

        const room = io.sockets.adapter.rooms[roomName];

        let allUsers;
        if (room) {                         //if the room already exists
            console.log('Rooms:')
            console.log(room)
            allUsers = room.sockets;
        }

        let numClients = 0;
        if (allUsers) {
            numClients = Object.keys(allUsers).length;
            console.log('numClients')
            console.log(numClients)
        }
        if (numClients === 0) {
            client.emit('unknownCode');
            return;
        } else if (numClients > 1) {
            client.emit('tooManyPlayers');
            return;
        }

        clientRooms[client.id] = roomName;
        client.join(roomName);
        // client.emit('start', roomName)
        console.log(room)
        io.in(roomName).emit('start',roomName)
        
    }

    function handleNewGame() {
        let roomName = makeid(5);           //check if code already exists
        clientRooms[client.id] = roomName;
        client.emit('gameCode',roomName)
        // console.log('handle new game')
        // console.log(roomName)
        client.join(roomName);
    }
})



function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

http.listen(4000, function() {
    console.log('listening on port 4000')
  })