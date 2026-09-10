"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MenuItems from "../menuItems/MenuItems";
import Button from "../../common/Button";
import AppointmentComponent from "@/components/appointmentComponent/AppointmentComponent";

import { FiPhone, FiMail, FiClock } from "react-icons/fi";

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

  // Close menu on route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isHome = pathname === "/";
  const transparent = isHome && !isScrolled && !isOpen;

  return (
    <div className="lg:hidden">
      <div
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[9999999999999]">
        <div
          className={`flex justify-between items-center p-4 transition-colors duration-300 ${
            isOpen
              ? "bg-[#0b1b34] text-white border-b border-white/10 shadow-lg"
              : transparent
              ? "bg-transparent text-white"
              : "bg-white text-primary shadow-md"
          }`}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src={isOpen || transparent ? "/logowhite.png" : "/logo.png"}
              alt="logo"
              width={80}
              height={80}
            />
          </Link>
          <motion.button
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`text-3xl z-50 transition-colors ${
              isOpen || transparent ? "text-white hover:text-primary" : "text-primary"
            }`}
            whileTap={{ scale: 0.92 }}>
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
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-[#0b1b34] via-[#091629] to-[#060f1c] z-40 flex flex-col">
            <motion.div
              className="flex flex-col items-start justify-start space-y-5 text-white overflow-y-auto h-full px-8 pt-24 pb-12 no-scrollbar max-w-sm mx-auto w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}>
              <MenuItems onItemClick={closeMenu} />

              {/* Divider */}
              <div className="w-full h-px bg-white/10 my-1" />

              {/* Action Buttons */}
              <div className="flex flex-col items-start w-full gap-3">
                <Button
                  title="Contact Us"
                  link="/contactus"
                  onClick={closeMenu}
                  className="w-full text-center bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-xl border-0 shadow-lg shadow-primary/20 text-base transition-all"
                />
                <AppointmentComponent
                  onSelect={closeMenu}
                  containerClassName="w-full"
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium py-3 px-6 rounded-xl transition-all text-base"
                />
              </div>

              {/* Quick Contact Footer */}
              <div className="w-full pt-4 border-t border-white/10 flex flex-col items-start gap-2.5 text-xs text-white/70">
                <a
                  href="tel:+9779843671048"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors">
                  <FiPhone className="text-primary text-sm flex-shrink-0" />
                  <span>+977 9843671048</span>
                </a>
                <a
                  href="mailto:kanooniastra@gmail.com"
                  className="flex items-center gap-2.5 hover:text-primary transition-colors">
                  <FiMail className="text-primary text-sm flex-shrink-0" />
                  <span className="truncate">kanooniastra@gmail.com</span>
                </a>
                <div className="flex items-center gap-2.5 text-white/50">
                  <FiClock className="text-sm flex-shrink-0" />
                  <span>Sun - Fri: 09:30 AM - 06:00 PM</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
