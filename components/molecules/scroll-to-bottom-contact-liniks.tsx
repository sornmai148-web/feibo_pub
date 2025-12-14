"use client";

import { useEffect, useState } from "react";
import { Megaphone, PhoneCall, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Container } from "./container";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

export default function ScrollToBottomButtonContactLinks() {
  const [nearBottom, setNearBottom] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setNearBottom(
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 70
      );
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.includes(ROUTES.ERROR)) return null;

  return (
    <div
      className={`fixed bottom-0 right-0 left-0 transition-opacity duration-300 z-20 ${
        !nearBottom ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to bottom"
    >
      <Container>
        <div
          className={cn(
            "bg-gradient-to-r backdrop-blur-3xl bg-gray-900 rounded-t-lg font-medium text-white shadow-[0px_-6px_15px_0px_#3b3939]",
            "grid grid-cols-3 py-5 sm:py-4 sm:max-w-4xl sm:mx-auto"
          )}
        >
          <Link
            href="https://t.me/tdqg88"
            target="_blank"
            className="group flex items-center border-r border-white/10 justify-center space-x-1.5"
          >
            <span>
              <UsersRound className="text-tertiary max-sm:size-4 group-hover:scale-105 duration-300 transition-transform" />
            </span>
            <span className="max-sm:text-xs">开群</span>
          </Link>

          <Link
            href="https://t.me/feibo"
            target="_blank"
            className="flex items-center justify-center border-r border-white/10 space-x-1.5 group"
          >
            <span>
              <Megaphone className="text-tertiary max-sm:size-4 group-hover:scale-105 duration-300 transition-transform" />
            </span>
            <span className="max-sm:text-xs">官方频道</span>
          </Link>

          <Link
            href="https://t.me/tdqg33"
            target="_blank"
            className="flex items-center justify-center space-x-1.5 group"
          >
            <span>
              <PhoneCall className="animate-bounce max-sm:size-4 text-tertiary group-hover:scale-105 duration-300 transition-transform" />
            </span>
            <span className="max-sm:text-xs">客服</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
