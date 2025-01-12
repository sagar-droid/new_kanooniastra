"use client";
import React, { useState } from "react";

const AppointmentComponent = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleOptionClick = (option: any) => {
    setShowDropdown(false);
    if (option === "enquiry") {
      window.location.href = "mailto:kanooniastra@gmail.com";
    } else if (option === "message") {
      window.open("https://wa.me/9867350369", "_blank");
    }
  };
  return (
    <div className="relative">
      <button
        className="bg-primary border text-white py-2 px-4 rounded"
        onClick={handleDropdownToggle}>
        Appointment
      </button>
      {showDropdown && (
        <div className="absolute top-full mt-2 bg-white shadow-lg rounded p-2 text-black">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            onClick={() => handleOptionClick("enquiry")}>
            Enquiry
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-200"
            onClick={() => handleOptionClick("message")}>
            Message
          </button>
        </div>
      )}
    </div>
  );
};

export default AppointmentComponent;
