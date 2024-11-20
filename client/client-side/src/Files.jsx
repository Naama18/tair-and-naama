import { useLocation, useNavigate } from "react-router-dom";
import { Delete } from "./contact-server"; // assuming Delete is an API function for deletion
import { useState } from "react";

function Files() {
  // Get location data (file names and user name)
  const location = useLocation();
  const fileNames = location.state?.fileName || []; // Default to an empty array if no fileNames

  const navigate = useNavigate();

  const userName = location.state?.name;
  console.log("fileNames: ", fileNames);
  console.log("userName: ", userName);

  // Set initial state of files from location state
  const [files, setFiles] = useState(fileNames);

  // Handle delete functionality
  function handleDelete(fileToDelete) {
    // Find the index of the file to delete
    const index = files.findIndex((file) => file === fileToDelete);
    console.log("index: ", index);

    if (index !== -1) {
      // Create a new array without the deleted file
      const updatedFiles = [...files]; // Copy the files array
      updatedFiles.splice(index, 1); // Remove the file at the found index

      // Update the state with the new files list
      setFiles(updatedFiles);
      console.log("Updated files: ", updatedFiles);
      navigate(".", { state: { ...location.state, fileName: updatedFiles } });
    }
  }

  // Render the component
  return (
    <div>
      <button>Add Folder</button>
      <button>Add File</button>

      <h3>File Names:</h3>
      {/* If files array is empty, show a message */}
      {files.length === 0 ? (
        <div>No files available</div>
      ) : (
        <ul>
          {files.map((name, index) => (
            <li key={index}>
              {name}
              {/* Delete button to handle file removal */}
              <button
                onClick={() => {
                  Delete(name, userName); // Call the delete API
                  handleDelete(name); // Handle deletion in the UI
                }}
              >
                Delete
              </button>
              <button>Rename</button>
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
