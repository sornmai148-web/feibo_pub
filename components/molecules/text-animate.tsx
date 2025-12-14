"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  items: string[];
}

export const TextAnimate: React.FC<Props> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  const startAnimation = () => {
    if (boxRef.current) {
      void boxRef.current.offsetWidth;
      boxRef.current.classList.add("marquee-text");
    }
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div className="marquee-container">
      <div
        ref={boxRef}
        className="text-white text-sm"
        onAnimationEnd={() => {
          if (activeIndex == items?.length - 1) {
            setActiveIndex(0);
          } else {
            const newIndex = activeIndex + 1;
            setActiveIndex(newIndex);
          }

          if (boxRef.current) {
            boxRef.current.classList.remove("marquee-text");
            void boxRef.current.offsetWidth;
            boxRef.current.classList.add("marquee-text");
          }
        }}
      >
        {items[activeIndex]}
      </div>
    </div>
  );
};
