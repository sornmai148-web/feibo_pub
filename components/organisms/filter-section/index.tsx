import { IFilter } from "@/api";
import { FilterType1 } from "./filter-type-1";
import { FilterType2 } from "./filter-type-2";
import { select } from "radash";
import { FilterMobileOption } from "./mobile";

interface Props {
  filterType1: Array<IFilter>;
  filterType2: Array<IFilter>;
}

export const FilterOption: React.FC<Props> = ({ filterType1, filterType2 }) => {
  const firstLevelFilterOption = select(
    filterType1 || [],
    (f) => f?.values,
    (f) => f?.parentId == null
  )?.flatMap((x) => x);

  const gameFilterOption = (filterType2 || [])
    ?.flatMap((x) => x.values)
    ?.map((x) => ({ ...x, parentId: -1 }));

  const secondLevelFilterOptioin = select(
    filterType1 || [],
    (f) => f?.values,
    (f) => typeof f?.parentId == "number"
  )?.flatMap((x) => x);

  return (
    <div>
      {/*--Desktop Screen --*/}
      <div className="max-sm:hidden">
        <div className="py-5">
          <FilterType1 items={filterType1 || []} />
        </div>
        <div className="pt-5 pb-10">
          <FilterType2 items={filterType2 || []} />
        </div>
      </div>

      {/*--- Mobile Screen ---*/}
      <div className="sm:hidden">
        <FilterMobileOption
          firstLevelFilterOption={firstLevelFilterOption}
          gameFilterOptions={gameFilterOption}
          secondLevelFilterOption={secondLevelFilterOptioin}
        />
      </div>
    </div>
  );
};
