"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FiSearch, FiPhone, FiMail, FiMapPin, FiClock, FiMessageSquare } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface FAQClientPageProps {
  initialFaqs: FAQItem[];
}

const FAQClientPage = ({ initialFaqs }: FAQClientPageProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>(() => {
    // Open the first item by default for a welcoming reading experience
    if (initialFaqs.length > 0) {
      return { [initialFaqs[0].id]: true };
    }
    return {};
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialFaqs.forEach((faq) => {
      if (faq.category) set.add(faq.category);
    });
    return ["All", ...Array.from(set)];
  }, [initialFaqs]);

  // Filter items by search query and category
  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "All" || faq.category === selectedCategory;
      const normalizedQuery = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !normalizedQuery ||
        faq.question.toLowerCase().includes(normalizedQuery) ||
        faq.answer.toLowerCase().includes(normalizedQuery) ||
        (faq.category && faq.category.toLowerCase().includes(normalizedQuery));

      return matchesCategory && matchesSearch;
    });
  }, [initialFaqs, selectedCategory, searchQuery]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredFaqs.forEach((f) => (allOpen[f.id] = true));
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Search and Category Filter Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/80 flex flex-col gap-6">
        {/* Search Input */}
        <div className="relative w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions by keyword, e.g. FDI, company registration, trademark, court..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-gray-50/70 hover:bg-gray-50 focus:bg-white border border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-inner transition-all text-base md:text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search query"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold p-1">
              ✕
            </button>
          )}
        </div>

        {/* Category Pills */}
        {categories.length > 1 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider mr-1">
              Topic:
            </span>
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              const count =
                category === "All"
                  ? initialFaqs.length
                  : initialFaqs.filter((f) => f.category === category).length;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? "bg-primary text-white shadow-sm ring-2 ring-primary/30"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200/80 hover:text-primary"
                  }`}>
                  <span>{category}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-white text-gray-500 border border-gray-200"
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content Layout: FAQ List + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: FAQ Accordions (8 cols on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Results Summary Bar */}
          <div className="flex items-center justify-between px-1 text-sm text-gray-600">
            <p>
              Showing <span className="font-semibold text-gray-900">{filteredFaqs.length}</span>{" "}
              {filteredFaqs.length === 1 ? "question" : "questions"}
              {selectedCategory !== "All" && (
                <>
                  {" "}in <span className="font-medium text-primary">{selectedCategory}</span>
                </>
              )}
              {searchQuery && (
                <>
                  {" "}matching &ldquo;<span className="font-medium text-gray-900">{searchQuery}</span>&rdquo;
                </>
              )}
            </p>

            {filteredFaqs.length > 0 && (
              <div className="flex gap-3 text-xs font-semibold text-gray-600">
                <button
                  onClick={expandAll}
                  className="hover:text-primary transition-colors cursor-pointer">
                  Expand all
                </button>
                <span>•</span>
                <button
                  onClick={collapseAll}
                  className="hover:text-primary transition-colors cursor-pointer">
                  Collapse all
                </button>
              </div>
            )}
          </div>

          {/* Accordion Cards */}
          {filteredFaqs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredFaqs.map((faq) => {
                const isOpen = Boolean(openItems[faq.id]);
                return (
                  <article
                    key={faq.id}
                    className={`rounded-2xl border transition-all duration-300 bg-white overflow-hidden ${
                      isOpen
                        ? "border-primary/40 shadow-md ring-1 ring-primary/10"
                        : "border-gray-200/90 shadow-sm hover:border-gray-300 hover:shadow"
                    }`}>
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      className="w-full p-6 text-left flex justify-between items-start gap-4 cursor-pointer group">
                      <div className="flex flex-col gap-1.5 flex-1 pr-2">
                        {faq.category && (
                          <span className="w-fit text-xs font-semibold px-2.5 py-0.5 rounded-md bg-primary/10 text-primary uppercase tracking-wider">
                            {faq.category}
                          </span>
                        )}
                        <h2
                          className={`text-xl md:text-2xl font-semibold transition-colors duration-200 ${
                            isOpen ? "text-primary" : "text-gray-900 group-hover:text-primary"
                          }`}>
                          {faq.question}
                        </h2>
                      </div>
                      <span
                        className={`text-2xl text-primary flex-shrink-0 mt-1 transition-transform duration-300 ${
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
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl">
                <FiSearch />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">No questions found</h3>
              <p className="text-gray-600 max-w-md text-base md:text-lg">
                We couldn&apos;t find any questions matching your current search or category filter. Try refining your keywords or clear your filters.
              </p>
              <button
                onClick={resetFilters}
                className="mt-2 px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 font-medium transition-colors cursor-pointer">
                Reset Search & Filters
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Sidebar with Consultation & Contact Card (4 cols on desktop) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
          {/* Direct Consultation Card */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/90 flex flex-col gap-6">
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl mb-1">
                <FiMessageSquare />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Need Specific Legal Advice?
              </h3>
              <p className="text-gray-600 text-base leading-relaxed">
                Legal situations in Nepal can be nuanced. If your question is not addressed here, speak directly with our advocates.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="flex flex-col gap-4 text-sm md:text-base">
              <div className="flex items-start gap-3">
                <FiPhone className="text-primary text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <div className="flex flex-col gap-0.5 text-gray-600">
                    <a href="tel:+9779843671048" className="hover:text-primary transition-colors">
                      +977 9843671048
                    </a>
                    <a href="tel:+9779844393183" className="hover:text-primary transition-colors">
                      +977 9844393183
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMail className="text-primary text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <a
                    href="mailto:kanooniastra@gmail.com"
                    className="text-gray-600 hover:text-primary transition-colors">
                    kanooniastra@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="text-primary text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Office</p>
                  <p className="text-gray-600">Ghattekulo marg, Kathmandu, Nepal</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FiClock className="text-primary text-lg mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">Working Hours</p>
                  <p className="text-gray-600">Sunday – Friday: 9:00 AM – 6:00 PM NPT</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/contactus"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base transition-all duration-200 shadow-sm hover:shadow">
                Book Consultation
              </Link>
              <a
                href="https://wa.me/9867350369"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FAQClientPage;
