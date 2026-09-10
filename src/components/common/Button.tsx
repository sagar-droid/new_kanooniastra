import Link from "next/link";
import React from "react";
import { cn } from "../../../utils/cn";

const Button = ({ title, link, className, onClick, ...props }: any) => {
  if (link) {
    return (
      <Link
        href={link}
        onClick={onClick}
        className={cn(
          "inline-block text-center rounded-lg text-xl bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black",
          className
        )}
        {...props}>
        {title}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-lg text-xl bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black",
        className
      )}
      {...props}>
      {title}
    </button>
  );
};

export default Button;
