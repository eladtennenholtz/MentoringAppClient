import React, { useState, useEffect } from "react";
import { socket } from "./services/socket";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./components/Lobby";
import CodeBlock from "./components/CodeBlock";
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
    // Fetch codeBlocks from your server or set it directly
    const fetchedCodeBlocks = [
      {
        id: "Async-case",
        title: "Async Case",
        code: "This is the code of the async",
      },
      {
        id: "Promise-example",
        title: "Promise Example",
        code: "This is the code of the promise",
      },
      {
        id: "Event-handler",
        title: "Event Handler",
        code: "This is the code of the event-handler",
      },
      {
        id: "Arrow-function",
        title: "Arrow Function",
        code: "This is the code of the arrow function",
      },
      // Add more code blocks as needed
    ];
    if (!isConnected) {
      setCodeBlocks(fetchedCodeBlocks);
      socket.emit("send_initial_code_blocks", fetchedCodeBlocks);
    } else {
      socket.emit("get_all_code_blocks");
      socket.on("all_code_blocks", (data) => {
        console.log("all code blocks    " + data);
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
    console.log(`received role ${data.role}`);
    setRole(data.role);
  });
  const updateIsMainPage = (newValue) => {
    console.log("i am in the updated" + newValue);
    setIsMainPage(newValue);
  };

  // Return the JSX
  return (
    <Router>
      <Routes>
        {/* Pass codeBlocks as a prop to Lobby */}
        <Route path="/" element={<Lobby codeBlocks={codeBlocks} />} />
        {/* Pass role and codeBlocks as props to CodeBlock */}
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
