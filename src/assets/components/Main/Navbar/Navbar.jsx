import React, { useRef } from "react";

//*CSS
import "./Navbar.scss";

//* components
import WorkspaceSelector from "../../NavbarComponents/WorkspaceSelector/WorkspaceSelector";
import Notifications from "../../NavbarComponents/Notifications/Notifications";
import Searchbar from "../../NavbarComponents/Searchbar/Searchbar";
import Usermenu from "../../NavbarComponents/Usermenu/Usermenu";
import Createbtn from "../../NavbarComponents/CreateBtn/Createbtn";
import useAuth from "../../../../hooks/useAuth";
const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="main__Navbar">
      <div className="leftMenu">
        <WorkspaceSelector workspaces={user.workspaces} />
        {/* <Notifications notifications={user.notifications} /> */}
      </div>
      <div className="centralMenu">
        <Searchbar />
      </div>
      <div className="rightMenu">
        <Createbtn />
        <Usermenu firstName={user.firstName} />
      </div>
    </div>
  );
};

export default Navbar;
