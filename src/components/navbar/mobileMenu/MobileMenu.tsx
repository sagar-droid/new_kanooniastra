"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MenuItems from "../menuItems/MenuItems";
import Button from "../../common/Button";
import AppointmentComponent from "@/components/appointmentComponent/AppointmentComponent";

const MobileMenu = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fixed header floats transparently over the home hero; measure its real
  // height so non-home pages can reserve that space instead of having
  // content start underneath it (same approach as the desktop Navbar).
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const updateHeight = () => setHeaderHeight(el.offsetHeight);
    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [isScrolled]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHome = pathname === "/";
  const transparent = isHome && !isScrolled;

  return (
    <div className="lg:hidden">
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[9999999999999]">
        <div
          className={`flex justify-between items-center p-4 transition-colors duration-300 ${
            transparent ? "bg-transparent text-white" : "bg-white text-primary shadow-md"
          }`}>
          <Link href="/">
            <Image
              src={transparent ? "/logowhite.png" : "/logo.png"}
              alt="logo"
              width={80}
              height={80}
            />
          </Link>
          <motion.button
            onClick={toggleMenu}
            className={`text-3xl z-50 ${transparent ? "text-white" : "text-primary"}`}
            whileTap={{ scale: 0.95 }}>
            {isOpen ? "×" : "☰"}
          </motion.button>
        </div>
      </div>
      {!isHome && <div style={{ height: headerHeight }} />}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-primary z-40 flex flex-col">
            <motion.div
              className="flex flex-col items-center justify-center space-y-6 text-white overflow-y-auto h-full p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <MenuItems />
              <Button title="Contact Us" link="/contactus" />
              <AppointmentComponent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
