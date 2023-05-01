import { useEffect, useState } from "react";

const useInfoTray = () => {
  const [isShowing, setIsShowing] = useState(false);

  function toggle() {
    setIsShowing(!isShowing);
  }
  useEffect(() => {
    setTimeout(() => {
      setIsShowing(false);
    }, 3000);
  }, [isShowing]);

  return {
    isShowing,
    toggle,
  };
};

export default useInfoTray;
