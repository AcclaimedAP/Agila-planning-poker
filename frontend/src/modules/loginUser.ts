import { userConnectSocketOn, userVoteSocketOn } from "../socket";

export async function loginUser(username: string): Promise<void> {
  const data = {
    username: username,
    isAdmin: false,
  };

  if (username === "admin") {
    data.isAdmin = true;
  }

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
    
    const responseData = await response.json();
    console.log(responseData);

    userConnectSocketOn();
    userVoteSocketOn();

    sessionStorage.setItem("username", username);
  } catch (error) {
    console.error(error);
  }
}