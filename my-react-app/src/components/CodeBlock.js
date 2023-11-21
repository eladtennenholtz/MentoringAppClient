import React, { useState, useEffect } from "react";
import hljs from "highlight.js/lib/core"; // Import the core library
import "highlight.js/styles/default.css";
import javascript from "highlight.js/lib/languages/javascript";

const fetchCodeBlock = async (codeBlockId) => {
  //I think this should be the call to the backend..
  const response = await fetch(`/api/code-blocks/${codeBlockId}`);
  const data = await response.json();
  return data;
};
hljs.registerLanguage("javascript", javascript);
const CodeBlock = ({ codeBlockId }) => {
  const [code, setCode] = useState("");
  useEffect(() => {
    // Find all code blocks in the component and highlight them
    hljs.highlightAll();
  }, []);

  useEffect(() => {
    const fetchAndSetCode = async () => {
      const codeBlockData = await fetchCodeBlock(codeBlockId);
      setCode(codeBlockData.code);
    };

    fetchAndSetCode();
  }, [codeBlockId]);

  return (
    <div>
      <h3>Code Block ID: {codeBlockId}</h3>
      <pre>{code}</pre>
    </div>
  );
};

export default CodeBlock;
