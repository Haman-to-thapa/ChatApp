import {Socket} from 'socket.io-client'
import { io } from 'socket.io-client'


const URL = "http://localhost:1000"

export const socket : Socket= io(URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts:5,
  reconnectionDelay : 1000
})
