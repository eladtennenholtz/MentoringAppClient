import React from "react";
import { Link } from "react-router-dom";
import "./Lobby.css";

const Lobby = (props) => {
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
