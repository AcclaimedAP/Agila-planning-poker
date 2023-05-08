import { userConnectSocketOn, userVoteSocketOn } from "./socket";
import { io } from 'socket.io-client';
const socket = io(`localhost:3000`);

export async function loginUser(username: string): Promise<void> {
    const data = {
      username: username,
    };
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Något gick fel med din inloggning");
      }
      socket.emit('user-connect', data.username);
      const responseData = await response.json();
      console.log(responseData);

      userConnectSocketOn();
      userVoteSocketOn();
    } catch (error) {
      console.error(error);
    }
  }