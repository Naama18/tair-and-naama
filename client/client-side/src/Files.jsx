import { useLocation } from "react-router-dom";
import { Delete } from "./contact-server";
function Files() {
  const location = useLocation();
  const fileNames = location.state?.fileName;

  if (!fileNames) {
    return <div>No files available</div>;
  }

  return (
    <div>
      <button>Add Folder</button>
      <button>Add File</button>

      <h3>File Names:</h3>
      <ul>
        {fileNames.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => Delete({ name })}>Delete</button>
            <button>Rename</button>
            <button>more details File</button>
            <button>add content</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Files;
