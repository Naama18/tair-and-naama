export async function Delete(fileName, userName) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const data = { fileName: fileName };

  const url = `http://localhost:3000/users-folder/${userName}`;
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    const fileName = result.fileName;
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function addFile(userName, newFileName) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const url = `http://localhost:3000/users-folder/${userName}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ type: "file", fileName: newFileName }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const fileName = result.fileName;

    navigate(`/Files/${user}`);
    return response.ok;
  } catch (error) {
    return response;
  }

  return 200;
}

export async function addFolder(userName, newFolderName) {
  const url = `http://localhost:3000/users-folder/${userName}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ type: "folder", folderName: newFolderName }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const fileName = result.fileName;

    navigate(`/Files/${user}`);
    return response.ok;
  } catch (error) {
    console.error("Error:", error);
    return response.status;
  }
}
export async function rename(userName, oldFile, newFile) {
  const url = `http://localhost:3000/users-folder/${userName}`;
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        oldFileName: oldFile,
        newFileName: newFile,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.ok;
  } catch (error) {
    console.error(error);
  }
}
