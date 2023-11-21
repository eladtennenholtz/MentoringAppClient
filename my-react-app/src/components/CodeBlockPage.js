import React from "react";
import { useParams } from "react-router-dom";
import CodeBlock from "./CodeBlock";

const CodeBlockPage = () => {
  const { codeBlockId } = useParams();

  return (
    <div>
      <h2>Code Block Details</h2>
      <CodeBlock codeBlockId={codeBlockId} />
    </div>
  );
};

export default CodeBlockPage;
