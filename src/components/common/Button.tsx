import React from "react";

const Button = ({ title, ...props }: any) => {
  return (
    <button className="  rounded-lg bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black">
      {title}
    </button>
  );
};

export default Button;
