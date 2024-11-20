import { useState } from "react";
import "./App.css";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import Files from "./Files"; // Import Files component
import { Routes, Route } from "react-router-dom"; // Use Routes for defining routes

function App() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LogIn isConnected={isConnected} setIsConnected={setIsConnected} />
        }
      />
      <Route
        path="/SignIn"
        element={
          <SignIn isConnected={isConnected} setIsConnected={setIsConnected} />
        }
      />
      {/* Dynamic route for Files, where username will be part of the URL */}
      <Route path="/Files/:username" element={<Files />} />
    </Routes>
  );
}

export default App;
