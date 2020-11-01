const io = require('socket.io')()
const port = 3000

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

        clientRooms[client.id] = roomName;
        console.log(clientRooms)
        client.join(roomName);
    }

    function handleNewGame() {
        let roomName = makeid(5);           //check if code already exists
        clientRooms[client.id] = roomName;
        console.log('handle new game')
        console.log(roomName)
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

io.listen(port);