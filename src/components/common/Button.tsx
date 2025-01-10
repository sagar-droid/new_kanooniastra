import Link from "next/link";
import React from "react";
import { cn } from "../../../utils/cn";

const Button = ({ title, link, className, ...props }: any) => {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg text-xl bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black",
        className
      )}>
      <Link href={link}>{title}</Link>
    </button>
  );
};

export default Button;
