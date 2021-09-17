const path=require('path');

const formatMessage=require('./utils/msgs')

const {userJoin,getCurrentUser,userLeave,getRoomUsers}=require('./utils/users')

const http=require('http')

const express=require('express');

const socketio =require ('socket.io')

const app=express();

const server=http.createServer(app)

const io=socketio(server)


//set static folder
app.use(express.static(path.join(__dirname,"Public")))

const botName='ChatCord Bot'

//listen for some kind of connection

//Run when client connects
io.on('connection',(socket)=>{
    console.log('New Ws connection....');

    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id ,username,room)

        socket.join(user.room)

        //fires off as soon as we connect
    //this is to single client
    socket.emit("message",formatMessage(botName,'Welcome to ChatCord!'))
console.log(user.username)
    // Broadcast when a user connects
    //to all the clients except the one connecting
   socket.broadcast.to(user.room).emit('message',formatMessage(botName,`A ${user.username} has joined the chat`))
   
//send users and room info

io.to(user.room).emit('roomUsers',{
    room:user.room,
    users:getRoomUsers(user.room)
})  

});



   
    
    //Listen for chat msg 
    socket.on('chatMessage',(msg)=>{
        const user=getCurrentUser(socket.id)
        console.log(user.username+'emitting')
   console.log(msg)
   //emit it to everybody now
   io.to(user.room).emit('message',formatMessage(user.username,msg ))
   
    })

    //runs when client disconnects
    //this is to all the clients in general
    socket.on('disconnect',()=>{
        const user=userLeave(socket.id)
        if(user){
        io.to(user.room).emit('message',formatMessage(botName,` ${user.username} has lef the chat`))
    
    
    
    io.to(user.room).emit('roomUsers',{
        room:user.room,
        users:getRoomUsers(user.room)
    })
    
    }
    
})
})



const PORT=3000 || process.env.PORT;

server.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);

})
