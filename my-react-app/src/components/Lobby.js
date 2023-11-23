import React from "react";
import { Link } from "react-router-dom";
import "./Lobby.css";

const codeBlocks = [
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
];

const Lobby = (props) => {
  //   const dataToSend = { prop1: "value" };
  //   const queryString = new URLSearchParams(dataToSend).toString();
  return (
    <div className="container">
      <h2 className="title">Choose Code Block</h2>
      <ul className="list">
        {props.codeBlocks.map((block) => (
          <li key={block.id} className="listItem">
            <Link to={`/code-block/${block.id} `} className="link">
              {block.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
