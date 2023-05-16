import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import LoadingScreen from "./LoadingScreen/LoadingScreen";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error.message);
      } finally {
        isMounted && setLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log("loading");
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
  }, []);
  return (
    <>{!persist ? <Outlet /> : loading ? <LoadingScreen /> : <Outlet />}</>
  );
  // return <Outlet />;
};

export default PersistLogin;
