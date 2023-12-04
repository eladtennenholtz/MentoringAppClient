import React, { useState, useEffect } from "react";
import { socket } from "./services/socket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import CodeBlock from "./components/CodeBlock";
import fetchedCodeBlocks from "./resources/resource";

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("mentor");
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    function onConnect() {
      setCodeBlocks(fetchedCodeBlocks);
      socket.emit("send_initial_code_blocks", fetchedCodeBlocks);
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("role", (data) => {
      setRole(data.role);
    });

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  if (isConnected) {
    socket.emit("get_all_code_blocks");
    socket.on("all_code_blocks", (data) => {
      setCodeBlocks(data);
    });
  }

  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Lobby codeBlocks={codeBlocks} />} />
        {}
        <Route
          path="/code-block/:codeBlockId"
          element={<CodeBlock role={role} codeBlocks={codeBlocks} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
