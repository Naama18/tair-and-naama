import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
export default function SignIn({ isConnected, setIsConnected }) {
  const url = "http://localhost:3000/signIn";
  const { user, fileName } = useUser();
  const { setUser, setFileName } = useUser();

  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleChangeName(event) {
    setUser(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  async function handleSubmit() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: user, password: password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Wait for the response to be parsed as JSON
      const result = await response.json();

      // Extract fileName from the result
      const fileName = result.fileName;

      // Navigate to Files/{username} with username as part of the URL
      navigate(
        `/Files/${user}`
        // state: { fileName: fileName, name: user },
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <h1>sign-in</h1>
      <label htmlFor="userName">userName:</label>
      <input
        type="text"
        id="userName"
        name="userName"
        onChange={handleChangeName}
      />
      <br />
      <br />
      <label htmlFor="password">password:</label>
      <input
        type="text"
        id="password"
        name="password"
        onChange={handleChangePassword}
      />
      <br />
      <br />
      <label htmlFor="validate-password"> validate password:</label>
      <input type="text" id="validate-password" name="validate-password" />
      <br />
      <br />
      <button
        onClick={() => {
          handleSubmit();
        }}
        type="submit"
        value="Submit"
      >
        submit
      </button>{" "}
    </>
  );
}
