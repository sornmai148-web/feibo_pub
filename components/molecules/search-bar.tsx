"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

interface Props {
  value?: string;
  className?: string;
}

export const SearchBar: React.FC<Props> = ({ value = "", className }) => {
  // const searchParams = useSearchParams();
  const [search, setSearch] = useState(value);
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null!);

  // const filterOutKeyword = searchParams
  //   .toString()
  //   .split("&")
  //   ?.filter((x) => !x.includes("keywords"))
  //   .join("&");

  useEffect(() => {
    if (!!!value && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [value]);

  return (
    <div
      className={cn(
        "backdrop-blur-2xl max-w-4xl py-2 sm:py-4 px-2.5 sm:px-5 mx-auto bg-gradient-to-r from-white/5 via-tertiary/5 to-white/5 rounded-2xl",
        className
      )}
    >
      <div className="flex items-center">
        <div className="relative grow">
          {/*-- Desktop --*/}
          <Input
            maxLength={50}
            defaultValue={value}
            type="search"
            placeholder="输入群名或者链接 ..."
            className="max-sm:hidden placeholder:text-quaternary max-sm:text-sm pr-32 text-white pl-6 !h-10 sm:!h-11 md:!h-12 bg-white/10 border-none rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="max-sm:hidden rounded-full max-sm:text-xs sm:text-sm absolute top-1/2 -translate-y-1/2 right-1 md:right-2 bg-teal-700 text-quaternary hover:bg-tertiary/80 max-sm:h-8 duration-500 cursor-pointer"
            onClick={() => router.push(ROUTES.$SEARCH(search))}
          >
            <Search />
            搜索&验群
          </Button>

          {/*-- Mobile --*/}
          <Input
            ref={inputRef}
            maxLength={50}
            defaultValue={search || value}
            type="search"
            placeholder="输入群名或者链接 ..."
            className="sm:hidden placeholder:text-quaternary max-sm:text-sm pr-32 text-white pl-6 !h-10 sm:!h-11 md:!h-12 bg-white/10 border-none rounded-full"
            onChange={(e) => {
              if (!!!e.target.value)
                return router.push(ROUTES.$HOME_HEADER("true"));
              setSearch(e.target.value);
            }}
          />
          <Button
            className="sm:hidden rounded-full max-sm:text-xs sm:text-sm absolute top-1/2 -translate-y-1/2 right-1 md:right-2 bg-teal-700 text-quaternary hover:bg-tertiary/80 max-sm:h-8 duration-500 cursor-pointer"
            onClick={() => {
              if (search) return router.push(ROUTES.$HOME_SEARCH("", search));
              // return router.push(ROUTES.$HOME_SEARCH(filterOutKeyword, search));
            }}
          >
            <Search />
            搜索&验群
          </Button>
        </div>
      </div>
    </div>
  );
};
