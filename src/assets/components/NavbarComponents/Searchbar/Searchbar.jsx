import React from "react";

//*CSS
import "./Searchbar.scss";

//*Icons
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = () => {
  return (
    <div className="searchBar">
      <AiOutlineSearch className="searchIcon" />
      <input id="search" name="Search" placeholder="Search" type="text" />
      <span className="search__shortcut">CTRL K</span>
    </div>
  );
};

export default Searchbar;
