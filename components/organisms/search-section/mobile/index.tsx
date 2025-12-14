import { ROUTES } from "@/config/routes";
import { BookOpenText, Gamepad2 } from "lucide-react";
import Link from "next/link";
import { SearchResultMobile } from "./search-result";

export const SearchMobileSection: React.FC<QueryParams> = (props) => {
  const { parent_label, sub_label, keywords } = props;

  const bothLabelExist =
    parent_label && sub_label ? `${parent_label} | ${sub_label}` : "";
  const someLabelExist = parent_label || sub_label || "搜索结果";
  const hideHeader = !!!keywords && !!!parent_label && !!!sub_label;

  return (
    <div className="max-w-4xl px-2.5 sm:px-3 mx-auto">
      {/*-- Head --*/}
      {!hideHeader && (
        <div className="pb-4">
          <Link
            href={ROUTES.HOME}
            className="max-sm:hidden flex items-center space-x-1.5 text-white mb-1 hover:text-tertiary duration-500 transition-colors justify-end"
          >
            <span>
              <BookOpenText className="size-4" />
            </span>
            <span>返回目录</span>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="flex rounded-sm items-center space-x-2 font-bold text-tertiary">
              <Gamepad2 />
              <span className="md:text-lg">
                {bothLabelExist ? bothLabelExist : someLabelExist}
              </span>
            </div>
            <div className="h-[1px] grow bg-gray-500" />
          </div>
        </div>
      )}

      {/*-- List --*/}
      <SearchResultMobile {...props} />
    </div>
  );
};
