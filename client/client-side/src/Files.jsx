import { useNavigate, useParams } from "react-router-dom";
import { Delete, addFolder, addFile, rename } from "./contact-server";
import { useUser } from "./UserContext";
import { useEffect } from "react";

function Files() {
  const { setUser, user, fileName, setFileName } = useUser();

  const params = useParams();

  useEffect(() => {
    if (!params.username) return;
    setUser(params.username);
  }, [params.username]);

  function handleDelete(fileToDelete) {
    const index = fileName.findIndex((file) => file === fileToDelete);

    if (index !== -1) {
      const updatedFiles = [...fileName];
      updatedFiles.splice(index, 1);

      setFileName(updatedFiles);
    }
  }

  function handleAddFile(newFileName) {
    // setFileName((prev) => prev.push(newFileName));
    setFileName((prev) => [...prev, newFileName]);
  }

  function handleAddFolder(newFolderName) {
    setFileName((prev) => [...prev, newFolderName]);
    // setFileName((prev) => prev.push(newFolderName));
  }

  function handleRename(newName, oldName) {
    let index;
    for (let i = 0; i < fileName.length; i++) {
      if (fileName[i] === oldName) {
        setFileName((prev) => {
          const updatedFileNames = [...prev];
          updatedFileNames[i] = newName;
          return updatedFileNames; // Return the updated array (important!)
        });
      }
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          {
            const newFolderName = prompt(
              "insert the folder name you want to add"
            );
            if (addFolder(user, newFolderName)) {
              handleAddFolder(newFolderName);
            } else {
              alert("error");
            }
          }
        }}
      >
        Add Folder
      </button>
      <button
        onClick={() => {
          const newFileName = prompt("insert the file name you want to add");

          if (addFile(user, newFileName)) {
            handleAddFile(newFileName);
          } else {
            alert("error");
          }
        }}
      >
        Add File
      </button>

      <h3>File Names:</h3>
      {fileName.length === 0 ? (
        <div>No files available</div>
      ) : (
        <ul>
          {fileName.map((name, index) => (
            <li key={index}>
              {name}
              <button
                onClick={() => {
                  Delete(name, user);
                  handleDelete(name);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  const newName = prompt("insert the new name of the file");
                  rename(user, name, newName);
                  handleRename(name, newName);
                }}
              >
                Rename
              </button>
              <button>More details</button>
              <button>Add content</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Files;
