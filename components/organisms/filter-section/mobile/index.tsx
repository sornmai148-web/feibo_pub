"use client";

import { IFilterValue } from "@/api";
import { useIsMounted, useMediaQuery } from "usehooks-ts";
import { FilterType1V2 } from "./filter-type-1";

interface Props {
  firstLevelFilterOption: Array<IFilterValue>;
  secondLevelFilterOption: Array<IFilterValue>;
  gameFilterOptions: Array<IFilterValue>;
}

export const FilterMobileOption: React.FC<Props> = (props) => {
  const isSmallScreen = useMediaQuery("(max-width: 639px)");
  const getScreenMounted = useIsMounted();
  const isMounted = getScreenMounted();

  if (isMounted && !isSmallScreen) return null;

  return <FilterType1V2 {...props} isSmallScreen={isSmallScreen} />;
};
