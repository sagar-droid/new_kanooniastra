"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

const FAQAccordion = ({ items }: FAQAccordionProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.id || index}
            className={`rounded-xl border transition-all duration-300 bg-white overflow-hidden ${
              isOpen
                ? "border-primary/40 shadow-md ring-1 ring-primary/10"
                : "border-gray-200 shadow-sm hover:border-gray-300"
            }`}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer group">
              <h3
                className={`text-xl font-semibold transition-colors duration-200 ${
                  isOpen ? "text-primary" : "text-gray-800 group-hover:text-primary"
                }`}>
                {item.question}
              </h3>
              <span
                className={`text-2xl text-primary flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}>
                <IoIosArrowDown />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}>
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-gray-600 text-lg leading-relaxed border-t border-gray-100 pt-4">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
