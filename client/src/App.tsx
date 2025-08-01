import { useState } from "react"
import type { User } from "./interface"
import { socket } from "./services/socket"
import Login from "./components/Login"
import Chat from "./components/Chat"




const App = () => {

  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const handleLogin = (username: string) => {
    socket.connect();
    socket.emit('join', username);

    setCurrentUser({ id: socket.id, username: username })
  }


  const handleLogout = (username: string) => {
    socket.emit('userLeft', username);

    socket.disconnect();
    setCurrentUser(null)
  }



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {
        !currentUser ? <Login onLogin={handleLogin} /> :
          <Chat currentUser={currentUser} handleLogout={handleLogout} />
      }


    </div>
  )
}

export default App