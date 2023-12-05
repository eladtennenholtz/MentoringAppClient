import React, { useState, useEffect } from "react";
import { socket } from "./services/socket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import CodeBlock from "./components/CodeBlock";
import fetchedCodeBlocks from "./resources/resource";

const App = () => {
  const [role, setRole] = useState("mentor");

  useEffect(() => {
    function onConnect() {
      socket.emit("send_initial_code_blocks", fetchedCodeBlocks);
    }

    function onDisconnect() {
      console.log("DiscoNNEcting..");
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

  return (
    <Router>
      <Routes>
        {}
        <Route
          path="/"
          element={<Lobby fetchedCodeBlocks={fetchedCodeBlocks} />}
        />
        {}
        <Route
          path="/code-block/:codeBlockId"
          element={
            <CodeBlock role={role} fetchedCodeBlocks={fetchedCodeBlocks} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
