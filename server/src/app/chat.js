const socketio = require('socket.io')
const { addUser, getUser, removeUser } = require('../helper/helper')
const {Room, Message, User} = require('../models/index')
module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: "http://localhost:3000",
            allowedHeaders: ["my-custom-header"],
            credentials: true
        }
    });
    console.log(`socket running`);
    io.on('connection', (socket) => {
        console.log('A user connected : ' + socket.id);
        socket.on('create-room', (name) => {
            console.log(`room is ${name}`);
            if(name && name.length > 0) {
                const room = new Room({name});
                room.save().then((results) =>{
                    io.emit('room-created', results)
                }).catch((err) => {
                    console.log(`err create-room : ${err}`);
                });
            }
        })

        socket.on('join', ({ name, room_id, user_id }) => {
            const { error, user } = addUser({
                socket_id: socket.id,
                name,
                room_id,
                user_id
            })
            socket.join(room_id);
            if (error) {
                console.log(`join err : ${error}`);
            } else {
                console.log(`join user : ${user_id}`);
            }
        })

        socket.on('sendMessage', (message, room_id, callback) => {
            const user = getUser(socket.id);
            const msgToStore = {
                name: user.name,
                user_id: user.user_id,
                room_id,
                text: message
            }
            console.log('message: ',msgToStore);
            io.to(user.room_id).emit('message', msgToStore);
            callback();
        })


        socket.on('disconnect', () => {
            console.log('A user disconnected : ' + socket.id);
            const user = removeUser(socket.id);
        })
    })
}