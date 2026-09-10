"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { services } from "../../../../data/services";

type MenuLeaf = { title: string; link: string; target?: string; rel?: string };

const practiceAreaItems: MenuLeaf[] = services.map((service) => ({
  title: service.title,
  link: `/our-services/${service.id}`,
}));

const publicationItems: MenuLeaf[] = [
  { title: "Blogs", link: "/blogs" },
  { title: "Case Studies", link: "/case-studies" },
  { title: "Testimonials", link: "/testimonials" },
  { title: "FAQ", link: "/faq" },
];

const resourceCenterItems: MenuLeaf[] = [
  { title: "Supreme Court of Nepal", link: "https://supremecourt.gov.np/web/" },
  { title: "Nepal Kanoon Patrika", link: "https://nkp.gov.np/" },
  { title: "Company Registar Office", link: "https://camis.ocr.gov.np/" },
  { title: "Nepal law commission", link: "https://www.lawcommission.gov.np/" },
  { title: "Tax office", link: "https://ird.gov.np/" },
  {
    title: "Department of cottage and small Industries",
    link: "http://www.dcsi.gov.np/en",
  },
  { title: "Department of Industries", link: "https://doind.gov.np/" },
  {
    title: "Department of commerce supplies and consumer protection",
    link: "https://doc.gov.np/",
  },
  { title: "Tourism Board", link: "https://www.tourismdepartment.gov.np/" },
  {
    title: "Department of Food Technology and Quality Control",
    link: "https://dftqc.gov.np/",
  },
  {
    title: "Tourism Office Kathmandu",
    link: "https://tourismktm.bagamati.gov.np/",
  },
  { title: "Social Wealfare Council", link: "https://www.swc.org.np/ne" },
  {
    title: "Office of the attorney General Nepal",
    link: "https://www.swc.org.np/ne",
  },
  {
    title: "Ip Bulletin",
    link: "https://doind.gov.np/industrial-property-bulletin",
  },
];

type MenuEntry =
  | { key: string; link: string; items?: undefined }
  | { key: string; items: MenuLeaf[]; link?: undefined };

const menuEntries: MenuEntry[] = [
  { key: "About", link: "/aboutus" },
  { key: "Team", link: "/ourteam" },
  { key: "Practice Area", items: practiceAreaItems },
  { key: "Our Services", link: "/our-services" },
  { key: "Publication", items: publicationItems },
  { key: "Resource Center", items: resourceCenterItems },
  // { key: "Contact", link: "/contactus" },
];

interface MenuItemsProps {
  onItemClick?: () => void;
}

const MenuItems = ({ onItemClick }: MenuItemsProps = {}) => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === key ? null : key);
  };

  const handleItemClick = () => {
    setActiveDropdown(null);
    onItemClick?.();
  };

  return (
    <ul
      ref={menuRef}
      className="w-full flex flex-col items-start lg:w-auto lg:flex-row lg:items-center !z-[999999] gap-1.5 lg:gap-6 uppercase text-base font-semibold tracking-wide">
      {pathname !== "/" && (
        <li className="w-full lg:w-auto hover:text-white/80 lg:hover:text-primary transition-colors">
          <Link
            href="/"
            onClick={onItemClick}
            className="w-full flex items-center justify-start py-2.5 px-3 rounded-lg hover:bg-white/5 lg:p-0 lg:w-auto lg:hover:bg-transparent transition-colors">
            Home
          </Link>
        </li>
      )}
      {menuEntries.map((entry) => (
        <li
          key={entry.key}
          className={
            entry.items
              ? "w-full lg:w-auto flex flex-col items-start lg:block relative group hover:text-white/80 lg:hover:text-primary transition-colors"
              : "w-full lg:w-auto hover:text-white/80 lg:hover:text-primary transition-colors"
          }>
          {entry.items ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className={`w-full lg:w-auto flex items-center justify-between lg:justify-start gap-2 cursor-pointer py-2.5 px-3 rounded-lg lg:p-0 select-none hover:bg-white/5 lg:hover:bg-transparent transition-colors ${
                  activeDropdown === entry.key ? "text-primary bg-white/5 lg:bg-transparent" : ""
                }`}
                onClick={(e) => handleDropdownToggle(entry.key, e)}>
                <span>{entry.key}</span>
                <span
                  className={`flex items-center transition-transform duration-200 lg:group-hover:rotate-180 ${
                    activeDropdown === entry.key ? "rotate-180 text-primary" : ""
                  }`}>
                  <IoIosArrowDown />
                </span>
              </div>
              <ul
                className={`w-full text-sm font-normal bg-white/[0.06] backdrop-blur-md rounded-xl my-1 p-2 flex flex-col gap-1 border border-white/10 normal-case lg:w-72 lg:sm:w-80 lg:max-w-[90vw] lg:max-h-80 lg:overflow-y-auto lg:overflow-x-hidden lg:bg-white lg:text-gray-800 lg:p-2 lg:shadow-xl lg:border lg:border-gray-100 lg:rounded-xl lg:custom-scrollbar lg:my-0 lg:border-0 lg:absolute lg:top-full lg:left-0 lg:translate-x-0 lg:mt-1 lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:pointer-events-auto transition-all duration-200 ease-out origin-top ${
                  activeDropdown === entry.key
                    ? "opacity-100 visible translate-y-0 pointer-events-auto relative"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none hidden lg:flex lg:absolute"
                }`}>
                {entry.items.map((item) => {
                  const isBlank = item.target === "_blank" || entry.key === "Resource Center";
                  return (
                    <li key={item.title} className="w-full flex-shrink-0">
                      <Link
                        href={item.link}
                        target={isBlank ? "_blank" : item.target}
                        rel={isBlank ? "noopener noreferrer" : item.rel}
                        onClick={handleItemClick}
                        className="block w-full px-3.5 py-2.5 rounded-lg text-sm text-left text-white/90 hover:text-white hover:bg-white/10 lg:text-gray-700 lg:hover:bg-gray-100 lg:hover:text-primary transition-colors whitespace-normal leading-snug">
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <Link
              href={entry.link}
              onClick={onItemClick}
              className="w-full flex items-center justify-start py-2.5 px-3 rounded-lg hover:bg-white/5 lg:p-0 lg:w-auto lg:hover:bg-transparent transition-colors">
              {entry.key}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;