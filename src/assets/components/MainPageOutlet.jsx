import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
//*components
import { Outlet } from "react-router-dom";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
function MainPageOutlet() {
  const axiosPrivate = useAxiosPrivate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();
  //   const getUser = async () => {
  //     try {
  //       const response = await axiosPrivate.post("/api/getuser", {
  //         signal: controller.signal,
  //         withCredentials: true,
  //         credentials: "include",
  //       });
  //       isMounted && setUser(response.data);
  //     } catch (err) {
  //       console.error(err.message);
  //     } finally {
  //       isMounted && setLoading(false);
  //     }
  //   };
  //   !user ? getUser() : setLoading(false);

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);
  // return <>{user ? <Outlet /> : <LoadingScreen status={true} />}</>;
  return <Outlet />;
}

export default MainPageOutlet;
