import axios from "../api/axios";
import useAuth from "./useAuth";
const useSignout = () => {
  const { setAuth } = useAuth();
  const signout = async () => {
    setAuth({});
    try {
      const response = await axios.post("/api/signout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return signout;
};

export default useSignout;
