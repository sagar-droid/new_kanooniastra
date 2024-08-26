import Link from "next/link";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const menuItems = {
  Services: [
    { title: "Family Law", link: "#" },
    { title: "Corporate Law", link: "#" },
    { title: "Property Law", link: "#" },
  ],
  Solutions: [], // Empty array for menu items without dropdown
  Company: [
    { title: "About Us", link: "#" },
    { title: "Our Team", link: "#" },
    { title: "Careers", link: "#" },
  ],
};

const MenuItems = () => {
  return (
    <ul className="flex gap-6">
      {Object.entries(menuItems).map(([key, items]) => (
        <li
          key={key}
          className={items.length > 0 ? "dropdown dropdown-hover" : ""}>
          <div tabIndex={0} role="button" className="flex gap-2 items-center">
            {key}
            {items.length > 0 && (
              <span className="flex items-center">
                <IoIosArrowDown />
              </span>
            )}
          </div>
          {items.length > 0 && (
            <ul
              tabIndex={0}
              className="dropdown-content text-black menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {items.map((item) => (
                <li key={item.title}>
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
