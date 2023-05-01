import React, { useEffect, useState } from "react";

const Dummy = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();
    const getUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}/getUser`, {
          method: "GET",
          mode: "cors",
        });
      } catch (err) {
        console.log(err);
      }
    };
  });
  return <div>Dummy</div>;
};

export default Dummy;
