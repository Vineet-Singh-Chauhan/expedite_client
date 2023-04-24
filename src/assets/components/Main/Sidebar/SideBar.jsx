import React from "react";
//*CSS
import "./Sidebar.scss";
//*icons
import { FaTasks } from "react-icons/fa";
import { GoTasklist } from "react-icons/go";
import { BiPlus } from "react-icons/Bi";
const SideBar = () => {
  return (
    <div className="main__sideBar">
      <div className="sideBar__submenu">
        <div className="menuItemWrap">
          <span className="menuItemIcon">
            <FaTasks />
          </span>
          <span className="menuItemName">All Tasks</span>
        </div>
        <div className="menuItemWrap">
          <span className="menuItemIcon">
            <GoTasklist />
          </span>
          <span className="menuItemName">My Tasks</span>
        </div>
      </div>
      <div className="sideBar__submenu">
        <div className="menuItemWrap">
          <span className="menuItemIcon">
            <BiPlus />
          </span>
          <span className="menuItemName">Extension</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
