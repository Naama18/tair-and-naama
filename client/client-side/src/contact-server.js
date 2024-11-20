export async function Delete(fileName) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify({ fileName: fileName }),
    });

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
    navigate("/Files", { state: { fileName: fileName } });
  } catch (error) {
    console.error("Error:", error);
  }
}
