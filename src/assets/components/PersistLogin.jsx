import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

const PersistLogin = () => {
  //   const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : null;
  }, []);

  useEffect(() => {
    console.log("loading");
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
  }, []);
  // return <>{loading ? <LoadingScreen /> : <Outlet />}</>;
  return <Outlet />;
};

export default PersistLogin;
