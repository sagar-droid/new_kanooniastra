"use client";

import { useRef, useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaTimes, FaComments } from "react-icons/fa";

const CONTACT_PHONE = "+9779843671048";
const CONTACT_PHONE_DISPLAY = "+977 9843671048";
const CONTACT_EMAIL = "kanooniastra@gmail.com";
const CONTACT_WHATSAPP = "9779843671048";

const contactOptions = [
  {
    label: "Call Us",
    sublabel: CONTACT_PHONE_DISPLAY,
    href: `tel:${CONTACT_PHONE}`,
    icon: FaPhoneAlt,
    className: "bg-primary text-white",
  },
  {
    label: "WhatsApp",
    sublabel: CONTACT_PHONE_DISPLAY,
    href: `https://wa.me/${CONTACT_WHATSAPP}`,
    icon: FaWhatsapp,
    className: "bg-[#25D366] text-white",
  },
  {
    label: "Email Us",
    sublabel: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    icon: FaEnvelope,
    className: "bg-primary text-white",
  },
];

const FloatingContact = () => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 250);
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-50 h-14 w-14"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}>
      <div
        className={`absolute bottom-full right-0 mb-3 flex flex-col gap-3 transition-all duration-200 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}>
        {contactOptions.map(({ label, sublabel, href, icon: Icon, className }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-3 rounded-full bg-white pl-4 pr-2 py-2 shadow-lg hover:shadow-xl transition-shadow">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {label} <span className="text-gray-400">{sublabel}</span>
            </span>
            <span
              className={`flex items-center justify-center h-9 w-9 rounded-full ${className}`}>
              <Icon size={18} />
            </span>
          </a>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        onFocus={openMenu}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-lg hover:scale-105 transition-transform">
        {open ? <FaTimes size={22} /> : <FaComments size={24} />}
      </button>
    </div>
  );
};

export default FloatingContact;
