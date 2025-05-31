import React, { useEffect, useRef, useState } from "react"
import type { ChatProps, Message, User } from "../interface"
import { socket } from "../services/socket"
import Header from "./chat/Header"
import Notification from "./chat/Notification"
import Sidebar from "./chat/Sidebar"
import { FiSend } from "react-icons/fi"
import MessageComponent from "./chat/MessageComponent"

const Chat = ({ currentUser, handleLogout }: ChatProps) => {
  const [message, setMessage] = useState<string>("")
  const [messages, setMessages] = useState<Message[]>([])
  const [user, setUser] = useState<User[]>([])
  const [notification, setNotification] = useState<{
    text: string
    type: "join" | "leave" | "message"
  } | null>(null)

  const messageEndRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Notification timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Socket events
  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage])
    }

    const handleMessageHistory = (messageHistory: Message[]) => {
      setMessages(messageHistory)
    }

    const handleUserList = (userList: User[]) => {
      setUser(userList)
    }

    const handleUserJoined = (username: string) => {
      setNotification({ text: `${username} joined the chat`, type: "join" })
    }

    const handleUserLeft = (username: string) => {
      setNotification({ text: `${username} left the chat`, type: "leave" })
    }

    socket.on("newMessage", handleNewMessage)
    socket.on("messageHistory", handleMessageHistory)
    socket.on("userList", handleUserList)
    socket.on("userJoined", handleUserJoined)
    socket.on("userLeft", handleUserLeft)

    // Clean up listeners on unmount
    return () => {
      socket.off("newMessage", handleNewMessage)
      socket.off("messageHistory", handleMessageHistory)
      socket.off("userList", handleUserList)
      socket.off("userJoined", handleUserJoined)
      socket.off("userLeft", handleUserLeft)
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      socket.emit("sendMessage", message)
      setMessage("")
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#f8f9fb]">
      {/* Header */}
      <Header currentUser={currentUser} users={user} handleLogut={handleLogout} />

      {/* You can add chat messages and input below */}
      {
        notification && <Notification text={notification?.text} type={notification?.type} />
      }
      {/* mian content */}



      <div className="flex flex-1 overflow-hidden">


        {/* Sidebar */}
        <Sidebar currentUser={currentUser} users={user} />


        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-50">
          {/* message */}

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-3xl mx-au space-y-4">
              {
                messages.map(({ timestamp, message, user }, index) => (
                  <div className={`flex ${user.id === socket.id ? "justify-end" : "justify-start"}`} key={index}>
                    <MessageComponent socket={socket} message={message} timestamp={timestamp} user={user} />

                  </div>
                ))
              }

              <div className="" ref={messageEndRef} />
            </div>
          </div>

          {/* message input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <form action="" onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
              <div className="relative flex items-center">
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                  placeholder="Types your message ...."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
                <button type="submit" disabled={!message.trim()} className="absolute right-2 p-2 text-white bg-gradient-to-r from-violet-500 to-indigo-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow duration-200">
                  <FiSend className="h-4 w-4" />
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Chat
