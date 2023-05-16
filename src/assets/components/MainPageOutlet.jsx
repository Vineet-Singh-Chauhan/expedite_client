import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
function MainPageOutlet() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await axiosPrivate.post("/api/getuser", {
          signal: controller.signal,
          withCredentials: true,
          credentials: "include",
        });
        console.log(response.data);
        isMounted && setUser(response.data);
        console.log(user);
      } catch (err) {
        console.error(err.message);
        // navigate("/auth", { state: { from: location }, replace: true });
      } finally {
        isMounted && setLoading(false);
      }
    };

    !user ? getUser() : setLoading(false);

    return () => (isMounted = false);
  }, []);
  return <>{user ? <Outlet /> : <LoadingScreen status={true} />}</>;
}

export default MainPageOutlet;
