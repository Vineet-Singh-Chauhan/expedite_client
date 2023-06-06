import { useState } from "react";
import postData from "../../utilities/PostFunctions/postData";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const useFetch = (url) => {
  const { setAuth, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [loading, setLoading] = useState(false);
  const [googleAuthError, setgoogleAuthError] = useState("");

  const handleGoogle = async (response) => {
    setLoading(true);
    setPersist(true);
    // localStorage.setItem("expeditePersist", true);
    postData(url, {
      credential: response.credential,
    })
      .then((data) => {
        // console.log(data);
        if (data.error) {
          setLoading(false);
          setgoogleAuthError(data.error);
          return;
        }
        setAuth({ accessToken: data.accessToken });
        setgoogleAuthError("");
        setLoading(false);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // console.log("from catch", error.message);
        setgoogleAuthError(error.message);
        setLoading(false);
      });
  };

  return { loading, googleAuthError, handleGoogle };
};

export default useFetch;
