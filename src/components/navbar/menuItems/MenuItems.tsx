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

const MenuItems = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
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
  };

  const handleItemClick = () => {
    setActiveDropdown(null);
  };

  return (
    <ul
      ref={menuRef}
      className="flex flex-col lg:items-center lg:flex-row !z-[999999] gap-6 uppercase text-base font-semibold tracking-wide">
      {pathname !== "/" && (
        <li className="hover:text-primary">
          <Link href="/">Home</Link>
        </li>
      )}
      {menuEntries.map((entry) => (
        <li
          key={entry.key}
          className={entry.items ? "relative group hover:text-primary" : "hover:text-primary"}>
          {entry.items ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className="flex gap-2 items-center cursor-pointer"
                onClick={(e) => handleDropdownToggle(entry.key, e)}>
                {entry.key}
                <span
                  className={`flex items-center transition-transform duration-200 lg:group-hover:rotate-180 ${
                    activeDropdown === entry.key ? "rotate-180" : ""
                  }`}>
                  <IoIosArrowDown />
                </span>
              </div>
              <ul
                className={`absolute dropdown-content normal-case text-black text-base menu bg-base-100 rounded-box z-[99999] w-72 max-h-96 overflow-y-auto p-2 shadow-lg transition-all duration-200 ease-out origin-top lg:group-hover:opacity-100 lg:group-hover:visible lg:group-hover:translate-y-0 lg:group-hover:pointer-events-auto ${
                  activeDropdown === entry.key
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}>
                {entry.items.map((item) => {
                  const isBlank = item.target === "_blank" || entry.key === "Resource Center";
                  return (
                    <li key={item.title} onClick={handleItemClick}>
                      <Link
                        href={item.link}
                        target={isBlank ? "_blank" : item.target}
                        rel={isBlank ? "noopener noreferrer" : item.rel}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <Link href={entry.link}>{entry.key}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
