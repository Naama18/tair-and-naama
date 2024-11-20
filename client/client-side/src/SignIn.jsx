import { useState } from "react";
export default function SignIn({ isConnected, setIsConnected }) {
    const url = "http://localhost:3000/signIn";
    const [user, setUser] = useState("");
    function handleChange(event) {
        setUser(event.target.value);
    }
    function handleSubmit() {
        fetch(url, {
            method: "POST",
            headers: headers,
            body: "",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })

            .catch((error) => {
                console.error("Error:", error);
            });
    }
    return (
        <>
            <label htmlFor="userName">userName:</label>
            <input type="text" id="userName" name="userName" onChange={handleChange} />
            <br />
            <br />
            <label htmlFor="password">password:</label>
            <input type="text" id="password" name="password" />
            <br />
            <br />
            <label htmlFor="validate-password"> validate password:</label>
            <input type="text" id="validate-password" name="validate-password" />
            <br />
            <br />
            <button
                onClick={() => {
                    setIsConnected(true);
                }}
                type="submit"
                value="Submit"
            >
                submit
            </button>{" "}
        </>
    );
}
