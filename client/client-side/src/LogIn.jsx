import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Files from "./Files";
export default function LogIn({ isConnected, setIsConnected }) {
  const url = "http://localhost:3000/logIn";
  const [user, setUser] = useState("");
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

    console.log("user", user);
    console.log("password", password);

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

      console.log(fileName);

      // Pass fileName as state to Files component
      navigate("/Files", { state: { fileName: fileName } });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <h1>log-in</h1>
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

      <button
        onClick={() => {
          handleSubmit();
        }}
        type="submit"
        value="Submit"
      >
        submit
      </button>
    </>
  );
}
