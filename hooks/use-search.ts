import { getFeiboList } from "@/api";
import { ROUTES } from "@/config/routes";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isEmpty } from "radash";

const PAGE_LIMIT = 20;

export const useSearch = (queryParams: QueryParams) => {
  const { keywords, field_id, filter_value } = queryParams || {};
  const router = useRouter();

  const validSearchKeyword =
    (keywords || "")?.length > 50 ? keywords?.slice(0, 50) : keywords;

  const searchByKeyword = {
    fieldName: "searchText",
    inputText: validSearchKeyword,
  };
  const filterByFieldId = {
    fieldId: field_id,
    values: [filter_value?.trim()],
  };

  const searchFilter = Boolean(validSearchKeyword)
    ? searchByKeyword
    : Boolean(field_id)
    ? filterByFieldId
    : {};

  const {
    isFetching,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["feibo-search", validSearchKeyword, field_id, filter_value],
    initialPageParam: 1,
    enabled: !isEmpty({ ...searchFilter }),
    queryFn: async ({ pageParam }) => {
      const response = await getFeiboList({
        contentType: "feibo",
        langCode: "zh-cn",
        pageNum: pageParam || 1,
        pageSize: PAGE_LIMIT,
        filters: [{ ...searchFilter }],
      });

      if (response?.code != 200) {
        return router.replace(ROUTES.ERROR);
      }

      return response;
    },

    getNextPageParam: (lastPage, __, lastPageParam) => {
      const page = Boolean((lastPage?.data?.data?.length || 0) < PAGE_LIMIT)
        ? undefined
        : lastPageParam + 1;
      return page;
    },
  });

  const flatData = data?.pages.flatMap((x) => x?.data) || [];

  return {
    isFetching,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data: flatData?.flatMap((x) => x?.data) || [],
    total: flatData?.at(-1)?.total || 0,
  };
};
