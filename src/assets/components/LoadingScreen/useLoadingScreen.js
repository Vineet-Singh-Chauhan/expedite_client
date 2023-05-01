import { useState } from "react";

const useLoadingScreen = () => {
  const [status, setStatus] = useState(false);
  function setLoadingStatus(param) {
    setStatus(param);
  }

  return { status, setLoadingStatus };
};

export default useLoadingScreen;
