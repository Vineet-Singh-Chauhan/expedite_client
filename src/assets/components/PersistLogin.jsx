import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
//*Components
import LoadingScreen from "./LoadingScreen/LoadingScreen";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const [loading, setLoading] = useState(true);

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

  return (
    <>{!persist ? <Outlet /> : loading ? <LoadingScreen /> : <Outlet />}</>
  );
};

export default PersistLogin;
