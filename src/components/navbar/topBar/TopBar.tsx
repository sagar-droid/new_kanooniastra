import React from "react";
import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

const TopBar = () => {
  return (
    <div className="hidden lg:flex bg-[#0b1b34] text-white text-base">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center gap-4">
          <a
            href="tel:+9779843671048"
            className="flex items-center gap-2 hover:text-primary">
            <FiPhone />
            +977 9843671048
          </a>
          <span className="text-white/30">|</span>
          <a
            href="mailto:kanooniastra@gmail.com"
            className="flex items-center gap-2 hover:text-primary">
            <FiMail />
            kanooniastra@gmail.com
          </a>
          <span className="text-white/30">|</span>
          <span className="flex items-center gap-2">
            <FiClock />
            Sun - Fri: 09:30 AM - 06:00 PM
          </span>
        </div>
        {/* <div className="flex items-center gap-4">
          <a href="#" className="hover:text-primary">
            Client Portal
          </a>
          <span className="text-white/30">·</span>
          <a href="#" className="hover:text-primary">
            Legal Disclaimer
          </a>
          <span className="text-white/30">·</span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-primary">
            Global (EN)
            <IoIosArrowDown className="text-xs" />
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default TopBar;
