"use client";

import { IFeibo } from "@/api";
import { EmptyState } from "@/components/molecules/empty-state";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "@/hooks/use-search";
import {
  ArrowUpRight,
  Image as Photo,
  LoaderCircle,
  Link as _Link,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import ShowMoreText from "react-show-more-text";
import FeiboThumb from "@/public/images/feibo-thumbnail.jpg";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { isEmpty } from "radash";

export const SearchResultMobile: React.FC<QueryParams> = (props) => {
  const { isLoading, hasNextPage, data, fetchNextPage } = useSearch(props);

  if (isLoading || (isEmpty(props?.field_id) && !!!props.keywords))
    return (
      <div className="flex flex-col space-y-4 pb-8">
        {Array.from({ length: 5 })?.map((_, i) => (
          <Skeleton
            key={i}
            className="w-full p-3 flex flex-col gap-2 sm:flex-row sm:h-32 bg-gray-50/10 rounded-xl"
          >
            <Skeleton className="relative sm:basis-1/6 flex items-center bg-transparent sm:m-1.5">
              <Skeleton className="w-1/2 sm:w-full py-5 bg-gray-50/10 flex items-center justify-center">
                <Photo className="size-9 text-gray-500/50" />
              </Skeleton>
            </Skeleton>

            <Skeleton className="relative flex flex-col space-y-2 sm:basis-4/6 bg-transparent sm:m-1.5 sm:p-3">
              <Skeleton className="h-4 sm:h-5 w-2/3 bg-gray-50/10" />
              <Skeleton className="h-3 sm:h-4 w-1/4 bg-gray-50/10" />
              <Skeleton className="w-full h-3 sm:h-4 bg-gray-50/10" />
              <Skeleton className="w-full h-3 sm:h-4 bg-gray-50/10" />
            </Skeleton>

            <Skeleton className="relative bg-transparent sm:basis-1/6 flex items-center sm:m-1.5">
              <Skeleton className="py-5 w-full bg-gray-50/10" />
            </Skeleton>
          </Skeleton>
        ))}
      </div>
    );

  if (!isLoading && !data?.length && (!!props?.keywords || !!props?.field_id)) {
    return (
      <EmptyState
        type="search"
        title="没有找到相关内容"
        subtitle="尝试其他关键词查找"
      />
    );
  }

  return (
    <div className="pb-8">
      <InfiniteScroll
        dataLength={data?.length}
        scrollThreshold={0.95}
        next={fetchNextPage}
        hasMore={hasNextPage}
        className="contents"
        loader={
          <div className="flex justify-center space-x-2 pt-5 pb-8 items-center">
            <span className="text-tertiary text-xs sm:text-sm">加载更多</span>
            <LoaderCircle className="animate-spin text-orange-600" />
          </div>
        }
      >
        <div className="flex flex-col space-y-4">
          {data?.map((x, i) => (
            <Item key={i} {...(x as IFeibo)} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

const Item: React.FC<IFeibo> = (props) => {
  const [isError, setIsError] = useState(false);

  const { title, body, medias, actionTarget } = props;

  const filterUselessLinks =
    (medias || [])?.filter(
      (link) => !/^https:\/\/cdn\d+\.telegram/.test(link?.url)
    ) || [];

  const lastTwo = filterUselessLinks?.slice(-2);
  const profile = (lastTwo || [])?.find((x) => x.mediaType == "image");

  return (
    <div className="border border-tertiary/5 flex max-md:flex-col md:space-x-5 max-md:space-y-2 md:items-center hover:-translate-y-1 hover:first:translate-y-0 duration-500 transition-transform bg-gradient-to-r from-tertiary/5 via-white/10 to-tertiary/5 p-4 rounded-xl">
      <div className="md:basis-1/6 max-h-44">
        <div
          className={
            "max-sm:hidden relative size-16 md:size-20 max-md:mb-3 md:mx-auto outline outline-offset-4 outline-gray-300/10 rounded-full overflow-hidden"
          }
        >
          <Image
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={isError || !profile?.url ? FeiboThumb : profile?.url}
            alt="feibo.png"
            className={cn("object-cover rounded-lg", {
              "!rounded-full object-cover": !!profile?.url,
            })}
            onError={() => setIsError(true)}
            fill
          />
          <div className="absolute top-0 left-0 right-0 size-full bg-gradient-to-br from-primary/40 to-transparent"></div>
        </div>
      </div>

      <div className="flex flex-col max-sm:space-y-2 md:px-2 space-y-1 md:basis-4/6 text-white">
        <h4 className="font-bold sm:text-lg line-clamp-3">
          {(title || "")?.trim()}
        </h4>
        <Link
          href={actionTarget?.url || "#"}
          target="_blank"
          className="text-xs flex items-center space-x-2 sm:mb-2 text-gray-100"
        >
          <_Link className="rotate-90 size-4 inline" />
          <span>{actionTarget?.url}</span>
        </Link>

        <div className="max-sm:hidden">
          <ShowMoreText
            lines={3}
            more="显示更多"
            less="显示较少"
            className="w-full !whitespace-pre-line !text-gray-300 !text-[13px] sm:text-sm !break-words"
            anchorClass="!text-tertiary !font-medium !cursor-pointer !text-[13px] sm:text-sm"
            truncatedEndingComponent={"..."}
          >
            <p className="text-gray-300 !whitespace-pre-line !text-[13px] sm:text-sm !break-words">
              {(body || "")?.trim()}
            </p>
          </ShowMoreText>
        </div>

        <div className="sm:hidden">
          <ShowMoreText
            lines={2}
            more="显示更多"
            less="显示较少"
            className="w-full !whitespace-pre-line !text-gray-300 !text-[13px] sm:text-sm !break-words"
            anchorClass="!text-tertiary !font-medium !cursor-pointer !text-[13px] sm:text-sm"
            truncatedEndingComponent={"..."}
          >
            <p className="text-gray-300 !whitespace-pre-line !text-[13px] sm:text-sm !break-words">
              {body?.trim()}
            </p>
          </ShowMoreText>
        </div>
      </div>
      <div className="md:basis-1/6 flex sm:justify-end">
        <Button
          className="group max-sm:h-8 bg-tertiary max-sm:w-full sm:w-fit hover:bg-tertiary/80 duration-300 transition-all hover:scale-105"
          asChild
        >
          <Link target="_blank" href={actionTarget?.url || "#"}>
            <ArrowUpRight className="group-hover:rotate-45 duration-300 transition-all group-hover:bg-primary/20 group-hover:p-1 group-hover:rounded-full" />
            <span>点我进群</span>
          </Link>
        </Button>
      </div>
    </div>
  );
};
