"use client";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Button from "../common/Button";
import MenuItems from "./menuItems/MenuItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileMenu from "./mobileMenu/MobileMenu";
import AppointmentComponent from "../appointmentComponent/AppointmentComponent";
import TopBar from "./topBar/TopBar";
import { IoSearchOutline } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Desktop header is fixed (so it can float transparently over the home
  // hero video); measure its real height so non-home pages can reserve
  // that much space instead of having their content start underneath it.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const updateHeight = () => setHeaderHeight(el.offsetHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isScrolled]);

  const isHome = pathname === "/";
  const transparent = isHome && !isScrolled;

  return (
    <>
      <div
        ref={headerRef}
        className="hidden md:block fixed top-0 left-0 w-full z-50">
        {!isScrolled && <TopBar />}
        <section
          className={`w-full transition-colors duration-300 ${
            transparent ? "bg-transparent" : "bg-white shadow-md"
          }`}>
          <article
            className={`container py-4 flex gap-10 items-center transition-colors duration-300 ${
              transparent ? "text-white" : "text-black"
            }`}>
            <div>
              <Link href="/">
                <Image
                  src={transparent ? "/logowhite.png" : "/logo.png"}
                  alt="logo"
                  width={130}
                  height={130}
                />
              </Link>
            </div>
            <div className=" flex items-center justify-between w-full">
              <MenuItems />
              <div className=" flex gap-4 items-center">
                <button
                  aria-label="Search"
                  className="text-xl hover:text-primary">
                  <IoSearchOutline />
                </button>
                <Button
                  title="Contact Us"
                  link="/contactus"
                  className={
                    transparent
                      ? "bg-transparent text-white text-base border-2 border-white hover:bg-primary hover:text-white hover:border-primary"
                      : "bg-white text-black text-base border-2 border-gray-300 hover:bg-primary hover:text-white hover:border-primary"
                  }
                />
                <AppointmentComponent />
              </div>
            </div>
          </article>
        </section>
      </div>
      {!isHome && (
        <div
          className="hidden md:block transition-[height] duration-300"
          style={{ height: headerHeight }}
        />
      )}
      <MobileMenu />
    </>
  );
};

export default Navbar;
