import Image from "next/image";
import React from "react";
import Button from "../common/Button";

const Navbar = () => {
  return (
    <section className=" bg-primary absolute top-0 flex gap-20 text-white items-center">
      <div>
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
      </div>
      <div className=" flex items-center text-lg px-10 justify-between w-full">
        <ul className=" flex gap-6 ">
          <li>Services</li>
          <li>Solutions</li>
          <li>Company</li>
        </ul>
        <div className=" p-2 bg-">
          <Button title="Contact Us" />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
