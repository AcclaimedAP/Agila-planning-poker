import { io } from "socket.io-client";
export const socket = io('http://localhost:3000');

export async function loginUser(username: string): Promise<void> {
  const user = {
    username: username,
    isAdmin: false,
  };

  if (username === "admin") {
    user.isAdmin = true;
  }

  socket.emit("user-connect", user);
  sessionStorage.setItem("username", user.username);
}
