import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const useScrollHint = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [show, setShow] = useState({ left: false, right: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      setShow({
        left: el.scrollLeft > 0,
        right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
      });
    };
    update();
    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, searchParams]);

  const scroll = (distance: number) =>
    ref.current?.scrollBy({ left: distance, behavior: "smooth" });

  return { scrollRef: ref, show, scroll };
};
