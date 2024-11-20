import { useState } from "react";
import "./App.css";
import LogIn from "./LogIn";
import SignIn from "./SignIn";
import Files from "./Files";
// import { NavLink } from "react-router-dom";
// import ReactDOM from "react-dom/client";
import { Routes, Route, Router } from "react-router-dom";
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
      <Route path="/Files" element={<Files />} />
    </Routes>
  );
}
export default App;
