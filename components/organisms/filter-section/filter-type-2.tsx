import { IFilter, IFilterValue } from "@/api";
import { ROUTES } from "@/config/routes";
import { Gamepad2 } from "lucide-react";
import Link from "next/link";

export const FilterType2: React.FC<{ items: Array<IFilter> }> = ({ items }) => {
  const firstFilterOptions = (items || [])?.flatMap((x) => x.values);

  return (
    <div>
      {/*-- Filter Header --*/}
      {firstFilterOptions?.length > 0 && (
        <div className="flex items-center space-x-2">
          <div className="flex rounded-sm items-center space-x-2 font-bold text-tertiary">
            <Gamepad2 />
            <span className="text-lg">游戏厂商</span>
          </div>
          <div className="h-[1px] grow bg-gray-500" />
        </div>
      )}

      {/*-- List Filter Options --*/}
      <div className="text-white mt-5 grid grid-cols-2 min-[375px]:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {(firstFilterOptions || [])?.map((x, i) => (
          <ItemLink key={i} {...x} />
        ))}
      </div>
    </div>
  );
};

const ItemLink: React.FC<IFilterValue> = ({
  fieldValue,
  valueText,
  fieldId,
}) => {
  return (
    <Link
      href={ROUTES.$FILTER({
        filterValue: fieldValue?.trim(),
        parentLabel: valueText,
        fieldId,
      })}
      className="group flex items-center justify-center space-x-2 bg-white/5 hover:font-bold px-3 max-sm:text-sm sm:px-5 py-1.5 sm:py-1 text-center rounded-xs hover:bg-tertiary duration-500 transition-all hover:scale-105 break-words"
    >
      {/* <span>
        <ArrowUpRight className="size-2.5 group-hover:text-white text-tertiary" />
      </span> */}
      <span className="text-sm sm:text-base">{valueText}</span>
    </Link>
  );
};
