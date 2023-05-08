export function createLoginForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.classList.add("login-form");

  const usernameInput = document.createElement("input");
  usernameInput.classList.add("login-input");
  usernameInput.type = "text";
  usernameInput.name = "username"; // Updated to "username"
  usernameInput.placeholder = "Användarnamn";

  const loginButton = document.createElement("button");
  loginButton.classList.add("login-button");
  loginButton.type = "submit";
  loginButton.textContent = "Logga in";

  form.append(usernameInput, loginButton);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      username: usernameInput.value, // Updated to "username"
    };

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return form;
};