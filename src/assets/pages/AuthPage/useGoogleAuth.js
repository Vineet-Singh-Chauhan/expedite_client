import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const useGoogleAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, setPersist } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [googleAuthError, setgoogleAuthError] = useState("");
  const from = location.state?.from?.pathname || "/";

  const handleGoogle = async (response) => {
    setLoading(true);
    setPersist(true);
    try {
      const res = await axiosPrivate.post("/api/google-auth", {
        credential: response.credential,
      });
      const data = res?.data;
      if (data.error) {
        setLoading(false);
        setgoogleAuthError(data.error);
        return;
      }
      setAuth({ accessToken: data.accessToken });
      setgoogleAuthError("");
      setLoading(false);
      navigate(from, { replace: true });
    } catch (err) {
      setgoogleAuthError(err.message);
      setLoading(false);
    }
  };

  const initializeGoogleAuth = () => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(
        document.getElementById("GoogleSignUpBtn"),
        {
          theme: "outline",
          size: "large",
          text: "signup_with",
          shape: "rectangular",
        }
      );

      // google.accounts.id.prompt();
    }
  };

  return { loading, googleAuthError, handleGoogle, initializeGoogleAuth };
};

export default useGoogleAuth;
