import React from "react";
import { Link } from "react-router-dom";

export default function Category({category}) {
  
  let {name, link } = category;

  return (
    <li>
    <div className="categoryContainer">
      <Link to={`/menus/${link}`}>
          <div className="imgContainer">
            <img src={require("../assets/category/" + name +".png")} alt={name} />
          </div>
          <div className="categoryTitle">
            <p>{name}</p>
          </div>
      </Link>
      </div>

    </li>
  );
}
