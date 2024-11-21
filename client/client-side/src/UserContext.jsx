import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fileName, setFileName] = useState([]);

  useEffect(() => {
    if (!user) return;

    async function getFileName() {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      const url = `http://localhost:3000/users-folder/${user}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Wait for the response to be parsed as JSON
        const result = await response.json();

        const fileNames = result.filenames;
        setFileName(fileNames);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    getFileName();
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, fileName, setFileName }}>
      {children}
    </UserContext.Provider>
  );
};
