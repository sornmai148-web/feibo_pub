"use client";

import { IFilterValue } from "@/api";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AnimateHeight, { Height } from "react-animate-height";

interface Props {
  parentLabel: string;
  items: Array<IFilterValue>;
}

const LIMIT_CONTENT_LENGTH = 86;

export const FilterType2V2: React.FC<Props> = ({ items, parentLabel }) => {
  const searchParams = useSearchParams();
  const sub_label = searchParams.get("sub_label") || "";

  const [height, setHeight] = useState<Height>(LIMIT_CONTENT_LENGTH);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (contentRef.current) {
      //-- This code used to measure the natural height of the content
      const measureHeight = contentRef.current.scrollHeight;
      setHeight(
        measureHeight > LIMIT_CONTENT_LENGTH
          ? LIMIT_CONTENT_LENGTH
          : measureHeight
      );

      setContentHeight(measureHeight);
    }
  }, [items?.length]);

  return (
    <div className="bg-gray-50/5 pb-2 px-2 rounded-b-md">
      <AnimateHeight
        id="example-panel z-20"
        className="rounded-b-md"
        duration={150}
        easing="linear"
        height={height || "auto"}
      >
        <div
          ref={contentRef}
          className="bg-white/5 py-2 rounded-md flex flex-wrap gap-2 px-2 pb-3"
        >
          {items.map((x) => (
            <button
              key={x.id}
              className={cn(
                "flex items-center justify-center space-x-1 text-white shrink-0 px-3 py-1.5 rounded-sm text-sm grow text-center",
                { "text-tertiary bg-gray-50/5": x.valueText == sub_label }
              )}
              onClick={() => {
                router.push(
                  ROUTES.$HOME({
                    filterValue: x.fieldValue?.trim(),
                    fieldId: x.fieldId,
                    subLabel: x.valueText,
                    parentLabel: parentLabel,
                  })
                );
              }}
            >
              <ArrowUpRight className="size-2.5" />
              <span>{x.valueText}</span>
            </button>
          ))}
        </div>
      </AnimateHeight>

      <div className="flex justify-center items-center mt-1">
        {contentHeight > LIMIT_CONTENT_LENGTH && (
          <button
            className="px-3 py-1 bg-amber-200/10 cursor-pointer border border-tertiary/70 rounded-2xl"
            aria-expanded={height !== 0}
            aria-controls="filter-type2"
            onClick={() =>
              setHeight(
                height == LIMIT_CONTENT_LENGTH ? "auto" : LIMIT_CONTENT_LENGTH
              )
            }
          >
            {height == LIMIT_CONTENT_LENGTH ? (
              <ChevronDown className="size-4 text-tertiary" />
            ) : (
              <ChevronUp className="size-4 text-tertiary" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
