import { IFilter, IFilterValue } from "@/api";
import { ROUTES } from "@/config/routes";
import { ArrowUpRight, Component } from "lucide-react";
import { select } from "radash";
import Link from "next/link";

export const FilterType1: React.FC<{ items: Array<IFilter> }> = ({ items }) => {
  if (!items?.length) return null;

  const firstLevelFilterOption = select(
    items || [],
    (f) => f?.values,
    (f) => f?.parentId == null
  )?.flatMap((x) => x);

  const secondLevelFilterOptioin = select(
    items || [],
    (f) => f?.values,
    (f) => typeof f?.parentId == "number"
  )?.flatMap((x) => x);

  if (!firstLevelFilterOption?.length && !secondLevelFilterOptioin?.length)
    return null;

  return (
    <div>
      {/*-- Filter Header --*/}
      <div className="flex items-center space-x-2">
        {firstLevelFilterOption?.length > 0 && (
          <div className="flex rounded-sm items-center space-x-2 font-bold text-tertiary">
            <Component />
            <span className="text-lg">群组目录</span>
          </div>
        )}
        <div className="h-[1px] grow bg-gray-500" />
      </div>

      {/*-- List Filter Options --*/}
      <div className="text-white flex flex-col p-2.5 sm:p-4 bg-white/5 mt-5 rounded-sm">
        {(firstLevelFilterOption || [])?.map((m, i) => (
          <MainItemLink key={i} {...m} items={secondLevelFilterOptioin} />
        ))}
      </div>
    </div>
  );
};

const MainItemLink: React.FC<IFilterValue & { items: Array<IFilterValue> }> = ({
  id,
  fieldValue,
  fieldId,
  valueText,
  items,
}) => {
  const subFilterOptions = select(
    items || [],
    (f) => ({ mainId: id, ...f }),
    (f) => f.parentId == id
  );

  return (
    <div className="last:[&>div:nth-child(2)]:hidden">
      <div className="grid sm:grid-cols-12 gap-2.5 sm:gap-x-4">
        <Link
          href={ROUTES.$FILTER({
            filterValue: fieldValue?.trim(),
            fieldId,
            parentLabel: valueText,
          })}
          className="sm:col-span-3 md:col-span-4 lg:col-span-3"
        >
          <div className="group rounded-sm hover:bg-tertiary duration-500 transition-all hover:scale-105 hover:font-bold py-1.5 sm:px-4 sm:py-2 bg-tertiary/10 flex items-center justify-center space-x-2 break-words max-sm:bg-tertiary/60">
            <span>
              <ArrowUpRight className="size-2.5 sm:hidden group-hover:text-white text-white sm:text-tertiary" />
            </span>
            <span className="max-sm:text-sm max-sm:font-bold text-center">
              {valueText}
            </span>
          </div>
        </Link>

        <div className="sm:col-span-9 md:col-span-8 lg:col-span-9 bg-gradient-to-r from-quaternary/5 max-sm:bg-none max-sm:border-[1px] max-sm:border-gray-600 max-sm:py-1.5 sm:via-quaternary/20 sm:to-quaternary/5 rounded-md">
          <div className="flex flex-wrap items-center space-x-3.5 sm:space-x-2.5 size-full px-2 pt-1.5 pb-3 sm:px-4">
            {(subFilterOptions || [])?.map((st, i) => (
              <ItemLink key={i} {...st} parentLabel={valueText} />
            ))}
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] bg-white/10 my-3" />
    </div>
  );
};

const ItemLink: React.FC<IFilterValue & { parentLabel: string }> = ({
  fieldValue,
  valueText,
  parentLabel,
  fieldId,
}) => {
  if (!valueText || !fieldValue) return null;

  return (
    <Link
      href={ROUTES.$FILTER({
        filterValue: fieldValue?.trim(),
        fieldId,
        subLabel: valueText,
        parentLabel,
      })}
      className="group flex items-center mt-1.5 justify-center space-x-1 hover:font-bold rounded-sm hover:text-tertiary bg-white/10 px-2 py-1 duration-500 transition-all hover:scale-105 break-words"
    >
      {/* <span>
        <ArrowUpRight className="size-2.5 group-hover:text-white text-tertiary" />
      </span> */}
      <span className="max-sm:text-xs text-[13px] text-center">
        {valueText}
      </span>
    </Link>
  );
};
