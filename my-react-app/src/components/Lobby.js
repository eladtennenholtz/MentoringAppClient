import React from "react";
import { Link } from "react-router-dom";
import "./Lobby.css";

const codeBlocks = [
  { id: "async-case", title: "Async Case" },
  { id: "promise-example", title: "Promise Example" },
  { id: "event-handler", title: "Event Handler" },
  { id: "arrow-function", title: "Arrow Function" },
];

const Lobby = () => {
  return (
    <div className="container">
      <h2 className="title">Choose Code Block</h2>
      <ul className="list">
        {codeBlocks.map((block) => (
          <li key={block.id} className="listItem">
            <Link to={`/code-blocks/${block.id}`} className="link">
              {block.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
