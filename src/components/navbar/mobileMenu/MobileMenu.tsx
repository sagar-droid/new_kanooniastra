"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MenuItems from "../menuItems/MenuItems";
import Button from "../../common/Button";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const bgColor = pathname === "/" ? "bg-transparent" : "bg-white";

  return (
    <div className="md:hidden z-[9999999999999]">
      <div
        className={`flex justify-between items-center p-4 ${bgColor} text-primary`}>
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
        </Link>
        <motion.button
          onClick={toggleMenu}
          className={`text-3xl z-50 ${isOpen ? "text-white" : "text-primary"}`}
          whileTap={{ scale: 0.95 }}>
          {isOpen ? "×" : "☰"}
        </motion.button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 w-full h-full bg-primary z-40 flex flex-col">
            <motion.div
              className="flex flex-col items-center space-y-6 text-white overflow-y-auto h-full p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>
              <MenuItems />
              <Button title="Contact Us" link="/contactus" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
