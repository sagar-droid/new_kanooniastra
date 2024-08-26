import Link from "next/link";
import React from "react";

const Button = ({ title, link, ...props }: any) => {
  return (
    <button className="  rounded-lg  text-xl bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black">
      <Link href={link}>{title}</Link>
    </button>
  );
};

export default Button;
