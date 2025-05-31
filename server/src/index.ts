import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { Message, User } from './interface'


dotenv.config()

const PORT = process.env.PORT || 4000;


const app = express()

app.use(cors())


const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
   origin:"http://localhost:5173",
   methods:["GET","POST","PUT","DELETE"]
  }
})

const users = new Map<string, User>()
const messages : Message[] = []

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`)

  // start socket join here 

  socket.on('join', (username: string) => {

    users.set(socket.id,  {
      id: socket.id, username:username});

      io.emit("userList", Array.from(users.values()));

      io.emit("userJoined",username);

      io.emit("messageHistory", messages) 

  })

  // if they connected then showing messages

 socket.on("sendMessage", (message: string) => {
    
  const user = users.get(socket.id) ; 
  if(user) {
    const msg : Message =  {
        user,
        message,
        timestamp: new Date()
    }; 
    messages.push(msg)
    io.emit("newMessage",msg)
    
  }

 })

 // if they disconnected by the socket

 socket.on("disconnect", () => {
  const user = users.get(socket.id)
  if(user) {
    console.log(`${user.username} left the chat`)
    users.delete(socket.id);

    io.emit("userList", Array.from(users.values()));
    io.emit('userLeft',user.username)
  }
 })

})


httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})