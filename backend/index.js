require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http')
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app)
const io = socketio(server,{
    cors:{
        origin:"*"
    }
})
const port = process.env.PORT || 8080;
//Connect to the database
mongoose.connect(process.env.DB_URI, {useNewUrlParser:true, useCreateIndex:true, useUnifiedTopology:true})
const db = mongoose.connection;
db.on('open', ()=>{console.log("Database connection successful")})
db.on('error', console.error.bind(console, "Connection Error: "))
//Middlewares
app.use(cors())
app.use(express.json())


//Routes Import
const userRoutes = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes' )
const groupRoutes = require('./routes/groupsRoutes')
const roomRoutes = require('./routes/roomRoutes')
const messageRoutes = require('./routes/messageRoutes')
const privateRoutes = require('./routes/privateChatRoutes')

//API Middleware
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/groups',groupRoutes)
app.use('/rooms',roomRoutes)
app.use('/chats',privateRoutes)
app.use('/messages',messageRoutes)



server.listen(port, ()=>{
    console.log(`Server running at port ${port}`)
})

//Socket io logic
io.on('connection', (socket)=>{
    console.log("New connection");
    socket.emit('connection',null)
})


