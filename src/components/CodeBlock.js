import React, { useState, useEffect } from "react";
import AceEditor from "react-ace";
import { socket } from "../services/socket";
import { useParams } from "react-router-dom";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools.js";
import "./CodeBlock.css";

const ace = require("ace-builds/src-noconflict/ace");
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);

const CodeBlock = (props) => {
  const { codeBlockId } = useParams();
  const [code, setCode] = useState("");
  const [showSmiley, setShowSmiley] = useState(false);

  const selectedCodeBlock = props.codeBlocks.find(
    (block) => block.id === codeBlockId
  );

  useEffect(() => {
    const handleMessage = (data) => {
      if (data.id === codeBlockId) {
        setCode(data.message);
      }
    };

    socket.on("receive_message", handleMessage);

    setCode(selectedCodeBlock.code); //when entering the codeBlock

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      socket.off("receive_message", handleMessage);
    };
  }, []);

  const handleCodeChange = (newCode) => {
    socket.emit("send_message", { message: newCode, id: codeBlockId });
    setCode(newCode);
  };
  const cleanAndNormalizeCode = (code) => {
    return code
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\t/g, " ")
      .replace(/  +/g, "\t")
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/^\uFEFF/, "");
  };

  const handleResult = () => {
    // Check if the code is correct and show the smiley

    if (
      cleanAndNormalizeCode(selectedCodeBlock.solution) ===
      cleanAndNormalizeCode(code)
    ) {
      setShowSmiley(true);
    } else {
      setShowSmiley(false);
    }
  };

  return (
    <div className="CodeBlock">
      <h1>Code Editor - {codeBlockId}</h1>
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={handleCodeChange}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          value={code}
          readOnly={props.role === "mentor" ? true : false}
        />
      </div>
      <div>
        {props.role === "student" && (
          <button onClick={handleResult}>Submit Solution</button>
        )}
        {showSmiley && <div className="smiley">😊</div>}
      </div>
    </div>
  );
};

export default CodeBlock;
