"use client";
import React, { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";

interface AppointmentComponentProps {
  onSelect?: () => void;
  className?: string;
  containerClassName?: string;
}

const AppointmentComponent = ({
  onSelect,
  className,
  containerClassName,
}: AppointmentComponentProps = {}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOptionClick = (option: any) => {
    setShowDropdown(false);
    onSelect?.();
    if (option === "enquiry") {
      window.location.href = "mailto:kanooniastra@gmail.com";
    } else if (option === "message") {
      window.open("https://wa.me/9867350369", "_blank");
    }
  };
  return (
    <div className={`relative ${containerClassName || ""}`}>
      <button
        className={
          className ||
          "flex items-center gap-2 rounded-lg text-base bg-primary p-2 text-white hover:border-black hover:border-2 hover:bg-white border-2 border-white hover:text-black"
        }
        onClick={handleDropdownToggle}>
        Appointment
        <IoCalendarOutline />
      </button>
      {showDropdown && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 bg-white shadow-xl rounded-xl p-2 text-black z-50 min-w-[150px] border border-gray-100">
          <button
            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => handleOptionClick("enquiry")}>
            Enquiry
          </button>
          <button
            className="block w-full text-left px-4 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => handleOptionClick("message")}>
            Message
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentComponent;
