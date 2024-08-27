"use client";
import Image from "next/image";
import React from "react";
import Button from "../common/Button";
import MenuItems from "./menuItems/MenuItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobileMenu/MobileMenu";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/" && (
        <section className=" bg-primary z-10 w-full">
          <article className=" container py-4 hidden  md:flex gap-20 text-white items-center">
            <div>
              <Link href="/">
                <Image src="/logo.svg" alt="logo" width={100} height={100} />
              </Link>
            </div>
            <div className=" flex items-center text-lg justify-between w-full">
              <MenuItems />

              <Button title="Contact Us" link="/contactus" />
            </div>
          </article>
          <div>
            <MobileMenu />
          </div>
        </section>
      )}
    </>
  );
};

export default Navbar;
