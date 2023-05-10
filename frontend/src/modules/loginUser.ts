import { userConnectSocketOn, userVoteSocketOn } from "../socket";
import { connectedUsers } from "../main"

export async function loginUser(username: string): Promise<void> {

  const user = {
    username: username,
    isAdmin: false,
  };

  if (username === "admin") {
    user.isAdmin = true;
  }

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Något gick fel med din inloggning");
    }
    
    const responseData = await response.json();
    console.log(responseData);

    
    sessionStorage.setItem("username", username);
  } catch (error) {
    console.error(error);
  }
}