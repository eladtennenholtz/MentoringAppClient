import React, { useState, useEffect } from "react";
import { socket } from "./services/socket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import CodeBlock from "./components/CodeBlock";
import fetchedCodeBlocks from "./resources/resource";
import { set } from "ace-builds/src-noconflict/ace";

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("mentor");
  const [codeBlocks, setCodeBlocks] = useState([]); // Add codeBlocks state
  const [isMainPage, setIsMainPage] = useState(true);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    if (!isConnected) {
      setCodeBlocks(fetchedCodeBlocks);
      socket.emit("send_initial_code_blocks", fetchedCodeBlocks);
    } else {
      socket.emit("get_all_code_blocks");
      socket.on("all_code_blocks", (data) => {
        setCodeBlocks(data);
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [isMainPage, isConnected]);

  socket.on("role", (data) => {
    setRole(data.role);
  });
  const updateIsMainPage = (newValue) => {
    setIsMainPage(newValue);
  };

  // Return the JSX
  return (
    <Router>
      <Routes>
        {}
        <Route path="/" element={<Lobby codeBlocks={codeBlocks} />} />
        {}
        <Route
          path="/code-block/:codeBlockId"
          element={
            <CodeBlock
              updateIsMainPage={updateIsMainPage}
              role={role}
              codeBlocks={codeBlocks}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
