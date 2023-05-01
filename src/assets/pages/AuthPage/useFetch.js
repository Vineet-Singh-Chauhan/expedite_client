import { useState } from "react";
import postData from "../../utilities/PostFunctions/postData";

const useFetch = (url) => {
  const [loading, setLoading] = useState(false);
  const [googleAuthError, setgoogleAuthError] = useState("");
  const handleGoogle = async (response) => {
    setLoading(true);
    postData(url, {
      credential: response.credential,
    })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setLoading(false);
          setgoogleAuthError(data.error);
          return;
        }
        setgoogleAuthError("");
        setLoading(false);
      })
      .catch((error) => {
        console.log("from catch", error.message);
        setgoogleAuthError(error.message);
        setLoading(false);
      });
  };

  return { loading, googleAuthError, handleGoogle };
};

export default useFetch;
