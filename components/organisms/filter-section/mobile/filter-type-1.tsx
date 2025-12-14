/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { IFilterValue } from "@/api";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FilterType2V2 } from "./filter-type-2";
import { Transition } from "@headlessui/react";
import { select } from "radash";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { useScrollHint } from "@/hooks/use-scroll-hints";

interface Props {
  isSmallScreen: boolean;
  firstLevelFilterOption: Array<IFilterValue>;
  secondLevelFilterOption: Array<IFilterValue>;
  gameFilterOptions: Array<IFilterValue>;
}

export const FilterType1V2: React.FC<Props> = ({
  isSmallScreen,
  firstLevelFilterOption,
  secondLevelFilterOption,
  gameFilterOptions,
}) => {
  const searchParams = useSearchParams();
  const isHome = !!searchParams.get("home");
  const keywords = !!searchParams.get("keywords");
  const parent_label = searchParams.get("parent_label");

  const [topLevelFilter, setTopLevelFilter] = useState({
    parentLabel: "",
    parentId: 0,
  });

  const router = useRouter();
  const { scrollRef, show, scroll } = useScrollHint();

  const mergeSecondLevel = [...secondLevelFilterOption, ...gameFilterOptions];

  const subFilterOptions = useMemo(
    () =>
      select(
        mergeSecondLevel || [],
        (f) => f,
        (f) => f.parentId == topLevelFilter.parentId
      ),
    [topLevelFilter.parentId]
  );

  useEffect(() => {
    if (!isSmallScreen) return;

    const initialData = firstLevelFilterOption[0];
    setTopLevelFilter({
      parentLabel: initialData?.valueText,
      parentId: initialData?.id,
    });

    router.replace(
      ROUTES.$HOME({
        filterValue: initialData.fieldValue?.trim(),
        fieldId: initialData.fieldId,
        parentLabel: initialData.valueText,
      })
    );
  }, [isSmallScreen]);

  useEffect(() => {
    if (!!!isHome) return;

    const initialData = firstLevelFilterOption[0];
    setTopLevelFilter({
      parentLabel: initialData?.valueText,
      parentId: initialData?.id,
    });

    router.replace(
      ROUTES.$HOME({
        filterValue: initialData.fieldValue?.trim(),
        fieldId: initialData.fieldId,
        parentLabel: initialData.valueText,
      })
    );
    const el = document.getElementById(`x-${initialData.valueText}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    window?.scrollTo({ top: 0, behavior: "smooth" });
  }, [isHome]);

  const fitlerOptions = [
    ...firstLevelFilterOption,
    ...[
      {
        id: -1,
        createTime: "",
        updateTime: "",
        fieldId: -1,
        fieldValue: "游戏厂商",
        valueText: "游戏厂商",
        sort: -1,
        status: 1,
        parentId: -1,
      },
    ],
  ];

  if (keywords) return null;

  if (!firstLevelFilterOption?.length && !gameFilterOptions?.length)
    return null;

  return (
    <>
      <div className="relative flex items-center space-x-1.5 bg-gray-50/5 backdrop-blur-2xl mt-2 px-2 py-3 rounded-x-md rounded-t-md">
        <div
          ref={scrollRef}
          className={cn(
            "relative flex space-x-2 items-center overflow-x-auto rounded-md grow scroll-smooth",
            "scrollbar pb-2.5 scrollbar-thumb-rounded-2xl scrollbar-h-[3px] scrollbar-thumb-gray-50/20 pr-5"
          )}
        >
          {fitlerOptions?.map((x) => (
            <button
              id={`x-${x.valueText}`}
              key={x.id}
              className={cn(
                "!scroll-mx-7 !cursor-pointer whitespace-nowrap font-medium text-sm px-3.5 text-white py-2 rounded-md bg-gray-100/10",
                { "text-tertiary": x.valueText == topLevelFilter.parentLabel }
              )}
              onClick={() => {
                setTopLevelFilter({
                  parentLabel: x.valueText,
                  parentId: +x.id,
                });
                router.push(
                  ROUTES.$HOME({
                    filterValue: x.fieldValue?.trim(),
                    fieldId: x.fieldId,
                    parentLabel: x.valueText,
                  })
                );

                const el = document.getElementById(`x-${x.valueText}`);
                if (el) el.scrollIntoView({ behavior: "smooth" });
                window?.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              {x.valueText}
            </button>
          ))}
        </div>

        <Transition show={show.left}>
          <button
            className="transition duration-300 ease-in data-closed:opacity-0 absolute top-3 left-2 bg-tertiary backdrop-blur-sm h-1/2 w-7 rounded-l-md flex justify-center items-center shadow-[-5px_0px_6px_0px_#575555]"
            onClick={() => scroll(-150)}
          >
            <ChevronLeft className="size-5 text-white" />
          </button>
        </Transition>

        <Transition show={show.right}>
          <button
            className="transition duration-300 ease-in data-closed:opacity-0 absolute top-3 right-2 bg-tertiary h-1/2 w-7 rounded-r-md flex justify-center items-center shadow-[-5px_0px_6px_0px_#575555]"
            onClick={() => scroll(150)}
          >
            <ChevronRight className="size-5 text-white" />
          </button>
        </Transition>
      </div>

      <Transition show={subFilterOptions?.length > 0}>
        <div className="transition duration-300 ease-in data-closed:opacity-0">
          <FilterType2V2
            parentLabel={parent_label || ""}
            items={subFilterOptions}
          />
        </div>
      </Transition>
    </>
  );
};
