import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const Container: React.FC<
  PropsWithChildren & { className?: string }
> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "xl:max-w-6xl lg:max-w-4xl sm:max-w-2xl px-2 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
