export interface User {
  id: string | undefined,
  username: string
}

export interface LoginProps {
  onLogin: (username: string) => void
}


export interface ChatProps {
  currentUser: User | null,
handleLogout: (username: string) => void
}

export interface Message {
  id:string,
  message: string, 
  users: User,
  timestamp: Date
}

export interface HeaderProps {
  currentUser: User | undefined | null,
  users: User[],
 handleLogut: (username: any) => void
}


export interface NotificationPorps {
  type: "join" | "leave" | "message",
  text: string

}


export interface SiderbarPorps {
  users: User[],
  currentUser: User | undefined | null,
}



export interface MessageComProps {
  user: User,
  socket: any,
  message: string
  timestamp: Date
}