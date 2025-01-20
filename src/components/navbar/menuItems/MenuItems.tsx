"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";

const menuItems = {
  "Practice Area": [
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
  Resources: [
    { title: "Blogs", link: "#" },
    { title: "Article", link: "#" },
    {
      title: "Useful Link",
      submenu: [
        {
          title: "Supreme Court of Nepal",
          link: "https://supremecourt.gov.np/web/",
        },
        {
          title: "Nepal Kanoon Patrika",
          link: "https://nkp.gov.np/",
        },
        {
          title: "Company Registar Office",
          link: "https://camis.ocr.gov.np/",
        },
        {
          title: "Nepal law commission",
          link: "https://www.lawcommission.gov.np/",
        },
        {
          title: "Tax office",
          link: "https://ird.gov.np/",
        },
        {
          title: "Department of cottage and small Industries",
          link: "http://www.dcsi.gov.np/en",
        },
        {
          title: "Department of Industries",
          link: "https://doind.gov.np/",
        },
        {
          title: "Department of commerce supplies and consumer protection",
          link: "https://doc.gov.np/",
        },
        {
          title: "Tourism Board",
          link: "https://www.tourismdepartment.gov.np/",
        },
        {
          title: "Department of Food Technology and Quality Control",
          link: "https://dftqc.gov.np/",
        },
        {
          title: "Tourism Office Kathmandu",
          link: "https://tourismktm.bagamati.gov.np/",
        },
        {
          title: "Social Wealfare Council",
          link: "https://www.swc.org.np/ne",
        },
        {
          title: "Office of the attorney General Nepal",
          link: "https://www.swc.org.np/ne",
        },
        {
          title: "Ip Bulletin",
          link: "https://doind.gov.np/industrial-property-bulletin ",
        },
      ],
    },
    { title: "News and Information", link: "#" },
  ],
  About: [
    { title: "About Us", link: "/aboutus" },
    { title: "Our Team", link: "/ourteam" },
    { title: "Careers", link: "/careers" },
  ],
};

const MenuItems = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setActiveSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === key ? null : key);
    // Close submenu when switching dropdowns
    if (activeDropdown !== key) {
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuToggle = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveSubmenu(activeSubmenu === key ? null : key);
  };

  const handleItemClick = () => {
    setActiveDropdown(null);
    setActiveSubmenu(null);
  };

  return (
    <ul
      ref={menuRef}
      className="flex flex-col md:items-center md:flex-row !z-[999999] gap-6">
      {pathname !== "/" && (
        <li className="hover:text-red-500">
          <Link href="/">Home</Link>
        </li>
      )}
      {Object.entries(menuItems).map(([key, items]) => (
        <li
          key={key}
          className={items.length > 0 ? "relative hover:text-red-500" : ""}>
          <div
            tabIndex={0}
            role="button"
            className="flex gap-2 items-center cursor-pointer"
            onClick={(e) => handleDropdownToggle(key, e)}>
            {key}
            {items.length > 0 && (
              <span className="flex items-center">
                <IoIosArrowDown />
              </span>
            )}
          </div>
          {items.length > 0 && activeDropdown === key && (
            <ul className="absolute dropdown-content text-black text-xl menu bg-base-100 rounded-box z-[99999] w-52 p-2 shadow">
              {items.map((item: any) => (
                <li key={item.title} className="relative">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={(e) =>
                      item.submenu
                        ? handleSubmenuToggle(item.title, e)
                        : handleItemClick()
                    }>
                    <Link href={item.link || "#"}>{item.title}</Link>
                    {item.submenu && <IoIosArrowDown />}
                  </div>
                  {item.submenu && activeSubmenu === item.title && (
                    <ul className="absolute border-2 border-gray-200 -left-2 top-[100%] m-0 md:ml-4 md:left-full md:top-0 text-black menu bg-base-100 rounded-box !z-[999999] md:w-96 p-2 shadow">
                      {item.submenu.map((subItem: any) => (
                        <li key={subItem.title} onClick={handleItemClick}>
                          <Link href={subItem.link}>{subItem.title}</Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
