import { io } from "socket.io-client";
import { createLoginForm } from "./login";

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('connected', socket.id);
});

const loginForm = createLoginForm();
const loginFormContainer = document.querySelector(".login-container");
loginFormContainer.appendChild(loginForm);
