"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

const STORAGE_KEY = "introSessionShown";

const hasSeenIntro = (): boolean => {
  if (typeof window === "undefined") return true;

  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

const markIntroSeen = () => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(STORAGE_KEY, "true");
  } catch {}
};

const IntroLoader = () => {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const currentPath =
      pathname ||
      (typeof window !== "undefined" ? window.location.pathname : "/");

    const isHome = currentPath === "/";

    if (!isHome) {
      markIntroSeen();
      document.documentElement.classList.remove("intro-pending");
      setDismissed(true);
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const forceIntro = searchParams.get("intro") === "true";
    const isPending =
      document.documentElement.classList.contains("intro-pending");

    if (!forceIntro && !isPending && hasSeenIntro()) {
      document.documentElement.classList.remove("intro-pending");
      setDismissed(true);
      return;
    }

    markIntroSeen();

    // Prevent the page from moving underneath the splash screen.
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [pathname]);

  const handleAnimationComplete = useCallback(() => {
    document.documentElement.classList.remove("intro-pending");
    document.body.style.overflow = "";
    setDismissed(true);
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <motion.div
      id="intro-splash-screen"
      aria-hidden="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 4,
        times: [0, 0.8, 1],
        ease: [0.30, 0, 0.24, 1],
      }}
      onAnimationComplete={handleAnimationComplete}
    >
      <motion.div
        initial={{
          scale: 0.75,
          opacity: 0,
          filter: "blur(8px)",
        }}
        animate={{
          scale: [0.75, 1, 1, 1.8],
          opacity: [0, 1, 1, 0],
          filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(2px)"],
        }}
        transition={{
          duration: 4,
          times: [0, 0.12, 0.8, 1],
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <Image
          src="/logowhite.png"
          alt="Kanooni Astra logo"
          width={160}
          height={160}
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default IntroLoader;
