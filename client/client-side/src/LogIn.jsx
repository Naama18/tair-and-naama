import { useState } from "react";
export default function LogIn({ isConnected, setIsConnected }) {
    const url = "http://localhost:3000/logIn";
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeName(event) {
        setUser(event.target.value);
    }

    function handleChangePassword(event) {
        setPassword(event.target.value);
    }

    function handleSubmit() {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        console.log("user", user);
        console.log("password", password);

        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ name: user, password: password }),
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response.json());
        });
    }
    return (
        <>
            <label htmlFor="userName">userName:</label>
            <input type="text" id="userName" name="userName" onChange={handleChangeName} />
            <br />
            <br />
            <label htmlFor="password">password:</label>
            <input type="text" id="password" name="password" onChange={handleChangePassword} />
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
