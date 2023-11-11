import { useEffect, useRef } from "react";

const effectRun = useRef(false);

useEffect(() => {
  if (effectRun.current === false) {
    const fetchData = async () => {
      try {
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }

  return () => {
    effectRun.current = true;
  };
}, []);
