"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const menuItems = {
  Services: [
    {
      title: "Foreign Direct Investment",
      link: "/our-services#foreign-direct-investment",
    },
    {
      title: "Intellectual Property",
      link: "/our-services#intellectual-property",
    },
    { title: "Family Law", link: "/our-services#family-law" },
    { title: "Property Law", link: "/our-services#property-law" },
    { title: "Corporate Law", link: "/our-services#corporate-law" },
    { title: "Litigation", link: "/our-services#litigation" },
    { title: "Criminal Law", link: "/our-services#criminal-law" },
  ],
  Solutions: [], // Empty array for menu items without dropdown
  Company: [
    { title: "About Us", link: "/aboutus" },
    { title: "Our Team", link: "/ourteam" },
    { title: "Careers", link: "/careers" },
  ],
};

const MenuItems = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (key: any) => {
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleItemClick = () => {
    setActiveDropdown(null); // Close dropdown when an item is clicked
  };

  return (
    <ul className="flex flex-col md:flex-row gap-6">
      {Object.entries(menuItems).map(([key, items]) => (
        <li key={key} className={items.length > 0 ? "relative" : ""}>
          <div
            tabIndex={0}
            role="button"
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => handleDropdownToggle(key)}>
            {key}
            {items.length > 0 && (
              <span className="flex items-center">
                <IoIosArrowDown />
              </span>
            )}
          </div>
          {items.length > 0 && activeDropdown === key && (
            <ul className="absolute dropdown-content text-black menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {items.map((item) => (
                <li key={item.title} onClick={handleItemClick}>
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
