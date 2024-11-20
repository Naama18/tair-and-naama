// import { useNavigate } from "react-router-dom";

export async function Delete(fileName, userName) {
  console.log("fileName: ", fileName);
  console.log("im at the delete client");
  //   console.log("fileName: ", fileName);
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const data = { fileName: fileName };
  //   const navigate = useNavigate();

  console.log("data: ", data);
  const url = `http://localhost:3000/users-folder/${userName}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(data),
    });
    console.log("response: ", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Wait for the response to be parsed as JSON
    const result = await response.json();
    console.log("result: ", result);

    // Extract fileName from the result
    const fileName = result.fileName;

    console.log(fileName);

    // Pass fileName as state to Files component
    // navigate("/Files", { state: { fileName: fileName } });
  } catch (error) {
    console.error("Error:", error);
  }
}
