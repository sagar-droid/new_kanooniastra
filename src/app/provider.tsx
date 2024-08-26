"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Provider = () => {
  useEffect(() => {
    AOS.init({
      offset: 120,
      delay: 400,
      duration: 700,
      easing: "ease",
      // once:true,
    });
  }, []);
  // return (
  //   <div>{children}</div>
  // )
  return null;
};

export default Provider;
