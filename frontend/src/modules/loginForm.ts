import { addTaskSocketOn, userConnectSocketOn, userVoteSocketOn } from "../socket";
import { loginUser } from "./loginUser";

export function createLoginForm(): HTMLDivElement {
  const formContainer = document.createElement("div");
  formContainer.classList.add("form-container");

  const form = document.createElement("form");
  form.classList.add("login-form");

  const loginHeader = document.createElement("h1");
  loginHeader.classList.add("login-header");
  loginHeader.textContent = "Log in!"

  const usernameInput = document.createElement("input");
  usernameInput.classList.add("login-input");
  usernameInput.type = "text";
  usernameInput.name = "username";
  usernameInput.placeholder = "Användarnamn";

  const loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.type = "submit";
  loginButton.textContent = "Log in";

  form.append(loginHeader, usernameInput, loginButton);
  formContainer.appendChild(form);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    userConnectSocketOn();
    userVoteSocketOn();
    addTaskSocketOn();
    loginUser(usernameInput.value);

    formContainer.remove();
  });

  return formContainer;
};