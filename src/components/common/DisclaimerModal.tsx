"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Nepal Bar Council rules of professional conduct restrict advocates/law
 * firms from advertising. This gate requires an affirmative click-through
 * once per browser session (sessionStorage) so each new tab/visit is
 * treated as user-initiated rather than solicited, while a page refresh
 * within the same tab does not re-prompt. Hidden on /admin, matching
 * PublicChrome's route split.
 */
const STORAGE_KEY = "disclaimerAccepted";

const DisclaimerModal = () => {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (isAdminRoute) return;
    try {
      setAccepted(sessionStorage.getItem(STORAGE_KEY) === "true");
    } catch {
      setAccepted(false);
    }
  }, [isAdminRoute]);

  useEffect(() => {
    if (isAdminRoute) return;
    document.body.style.overflow = accepted === false ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [accepted, isAdminRoute]);

  const handleAccept = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // sessionStorage unavailable, fall back to in-memory acceptance only
    }
    setAccepted(true);
  };

  if (isAdminRoute || accepted !== false) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
    >
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl sm:p-8">
        <h2 id="disclaimer-title" className="text-2xl font-semibold text-gray-900 sm:text-3xl">
          Disclaimer
        </h2>
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-gray-700 sm:mt-5 sm:space-y-4 sm:text-base md:text-lg">
          <p>
            The Nepal Bar Council&apos;s rules of professional conduct do not permit
            advocates or law firms to advertise or solicit work. By clicking &quot;I
            Accept&quot; below, you confirm and acknowledge that:
          </p>
          <ul className="list-disc space-y-2 pl-5 sm:pl-6">
            <li>
              You are accessing this website (kanooniastra.com) on your own
              initiative, and there has been no advertisement, personal
              communication, solicitation, invitation, or inducement of any sort
              from Kanooni Astra or any of its members to solicit work through
              this website.
            </li>
            <li>
              The content on this website is provided for general informational
              purposes only and does not constitute legal advice.
            </li>
            <li>
              Viewing this website does not create a lawyer-client relationship
              between you and Kanooni Astra.
            </li>
            <li>
              Kanooni Astra is not responsible for any decision made by you
              relying on the information on this website. You should seek
              independent legal counsel before acting on any information found
              here.
            </li>
          </ul>
        </div>
        <label className="mt-5 flex items-start gap-3 text-sm text-gray-800 sm:mt-6 sm:text-base md:text-lg">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span>
            I have read and understood the above disclaimer and agree to its
            terms.
          </span>
        </label>
        <button
          type="button"
          disabled={!checked}
          onClick={handleAccept}
          className="mt-5 w-full rounded-md bg-primary px-4 py-3 text-base font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90 sm:mt-6 sm:text-lg"
        >
          I Accept
        </button>
      </div>
    </div>
  );
};

export default DisclaimerModal;
