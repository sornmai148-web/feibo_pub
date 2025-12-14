"use client"; // Only needed in Next.js App Router

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // Optional icon library

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`shadow-[0px_0px_57px_0px_rgba(0,_0,_0,_0.1)] cursor-pointer fixed bottom-56 right-5 sm:bottom-10 sm:right-10 lg:right-72 z-50 rounded-full bg-white outline outline-offset-4 outline-white/30 backdrop-blur-2xl p-2 sm:p-3 text-tertiary transition-colors duration-500 hover:bg-tertiary hover:text-white ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4 sm:size-5" />
    </button>
  );
}
