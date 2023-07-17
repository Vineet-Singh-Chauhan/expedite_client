import React, { lazy } from "react";
import useAuth from "../../../../hooks/useAuth";

//*CSS
import "./Navbar.scss";

//* components
const WorkspaceSelector = lazy(() =>
  import("../../NavbarComponents/WorkspaceSelector/WorkspaceSelector")
);
const Searchbar = lazy(() =>
  import("../../NavbarComponents/Searchbar/Searchbar")
);
const Usermenu = lazy(() => import("../../NavbarComponents/Usermenu/Usermenu"));
const Createbtn = lazy(() =>
  import("../../NavbarComponents/CreateBtn/Createbtn")
);

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
