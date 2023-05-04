import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "../../../hooks/useRefreshToken";
// import useInterceptedFetch from "../../../hooks/useInterceptedFetch";
import { Link } from "react-router-dom";

const Dummy = () => {
  const [user, setUser] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  // const refreshFetch = useInterceptedFetch();
  const refresh = useRefreshToken();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUser = async () => {
      try {
        const response = await axiosPrivate.post("/api/getuser", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUser(response.data);
        console.log(user);
      } catch (err) {
        console.error(err.message);
        navigate("/auth", { state: { from: location }, replace: true });
      }
    };

    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <div>
      {/* {user} */}
      <button
        onClick={() => {
          refresh();
        }}
      >
        refresh
      </button>
      <Link to="/home">HOME</Link>
      <Link to="/reset">RESET</Link>
      <Link to="/forgot">FOrgot</Link>
    </div>
  );
};

export default Dummy;
