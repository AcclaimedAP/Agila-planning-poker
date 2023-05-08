import { io } from "socket.io-client";
import { createLoginForm } from "./loginForm";

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('connected', socket.id);
});

document.querySelector("#app")?.appendChild(createLoginForm());
