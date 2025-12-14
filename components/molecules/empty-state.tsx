import Image from "next/image";

import EmptyStateImg from "@/public/images/empty-result.png";
import EmptyStateSearchImg from "@/public/images/empty-search-result.png";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

interface Props {
  type?: "default" | "search";
  title: string;
  subtitle: string;
}

export const EmptyState: React.FC<Props> = ({
  type = "default",
  title,
  subtitle,
}) => {
  const img = getImage(type);
  return (
    <div
      className={cn(
        "h-[calc(100dvh-420px)] rounded-t-xl flex justify-center items-center",
        {
          "h-[90dvh]": type == "default",
        }
      )}
    >
      <div className="size-fit flex flex-col justify-center items-center">
        <div className="relative w-24 h-24">
          <Image
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={img}
            alt="empty-state"
            className="object-cover"
            fill
          />
        </div>
        <div className="flex flex-col mt-4 justify-center items-center">
          <h2 className="text-xl font-bold text-quaternary text-center">
            {title}
          </h2>
          <span className="font-medium text-gray-400 text-center text-sm">
            {subtitle}
          </span>
        </div>

        <div className="sm:hidden">
          <Button size="sm" className="mt-2 bg-gray-50/15 !text-xs">
            <Link href={ROUTES.$HOME_HEADER("true")}>返回过滤</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

function getImage(type: Exclude<Props["type"], undefined>) {
  switch (type) {
    default:
    case "default":
      return EmptyStateImg;

    case "search":
      return EmptyStateSearchImg;
  }
}
