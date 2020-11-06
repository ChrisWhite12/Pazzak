const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', client => {

    client.on('newGame', handleNewGame);
    client.on('joinGame', handleJoinGame);
    client.on('getCard', handleGetCard);
    client.on('playCard', handlePlayCard);
    client.on('playerStay', handlePlayerStay);


    let clientRooms = {}
    let state = {}

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
        client.number = 2;
        // client.emit('start', roomName)
        console.log(room)
        io.sockets.in(roomName).emit('start',roomName)
        // state.deck = new Deck()
        // console.log(state.deck.deck)
        // console.log(state.deck.deck.drawcard())
        // console.log(state.deck.deck.drawcard())
        // console.log(state.deck.deck.drawcard())
    }

    function handleNewGame() {
        let roomName = makeid(5);           //check if code already exists
        

        clientRooms[client.id] = roomName;
        client.emit('gameCode',roomName)
        // console.log('handle new game')
        // console.log(roomName)
        client.join(roomName);
        const room = io.sockets.adapter.rooms[roomName];
        client.number = 1;
        console.log(room)
    }

    function handlePlayerStay(){

    }

    function handleGetCard() {

    }

    function handlePlayCard() {
        
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