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
      
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  }