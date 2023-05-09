import { loginUser } from "./loginUser";

export function createLoginForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.classList.add("login-form");

  const loginHeader = document.createElement("h1");
  loginHeader.classList.add("login-header");
  loginHeader.textContent = "Logga in!"

  const usernameInput = document.createElement("input");
  usernameInput.classList.add("login-input");
  usernameInput.type = "text";
  usernameInput.name = "username";
  usernameInput.placeholder = "Användarnamn";

  const loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.type = "submit";
  loginButton.textContent = "Logga in";

  form.append(loginHeader, usernameInput, loginButton);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    loginUser(usernameInput.value);
  });

  return form;
};
