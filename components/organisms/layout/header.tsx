"use client";

import Image from "next/image";
import LogoImg from "@/public/images/feibo-logo.jpg";
import Link from "next/link";
import { Container } from "@/components/molecules/container";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";
import { useCollapse } from "@collapsed/react";
import { AlignCenter, ChevronRight, X } from "lucide-react";

export const Header = () => {
  const router = useRouter();
  const { getToggleProps, getCollapseProps, isExpanded, setExpanded } =
    useCollapse({
      easing: "linear",
      duration: 150,
    });

  return (
    <header className="sticky z-40 top-0 bg-primary">
      <Container>
        <nav className="relative flex justify-between items-center w-full py-2.5">
          {/*-- Logo redirect for large screen only --*/}
          <div className="max-sm:hidden">
            <LogoSection onClick={() => router.push(ROUTES.HOME)} />
          </div>

          {/*-- Logo redirect for mobile only --*/}
          <div className="sm:hidden">
            <LogoSection
              onClick={() => router.push(ROUTES.$HOME_HEADER("true"))}
            />
          </div>

          <div className="max-sm:hidden flex items-center space-x-3 font-medium text-white">
            <ItemLink label="首页" href={ROUTES.HOME} />
            {/* <ItemLink label="关于飞博" href={ROUTES.ABOUT} /> */}
            {/* <ItemLink label="联系我们" href={ROUTES.CONTACT} /> */}
          </div>

          <div className="hidden max-sm:block">
            <button {...getToggleProps()}>
              {isExpanded ? (
                <X className="text-white" />
              ) : (
                <AlignCenter className="text-white" />
              )}
            </button>
          </div>
        </nav>
      </Container>

      <div className="sm:hidden">
        <div {...getCollapseProps()}>
          <div className="flex w-full flex-col space-y-3 font-medium text-white py-4 px-5">
            <MobileItemLink
              onClick={() => setExpanded(false)}
              label="首页"
              href={ROUTES.$HOME_HEADER("true")}
            />

            {/* <MobileItemLink
              onClick={() => setExpanded(false)}
              label="关于飞播"
              href={ROUTES.ABOUT}
            />
            <MobileItemLink
              onClick={() => setExpanded(false)}
              label="联系我们"
              href={ROUTES.CONTACT}
            /> */}
          </div>
        </div>
      </div>
    </header>
  );
};

const LogoSection: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <div className="flex items-center space-x-2">
    <button
      onClick={onClick}
      className="cursor-pointer relative shrink-0 border-amber-400 size-10 sm:size-16 rounded-xl border-[3px] overflow-hidden"
    >
      <Image
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={LogoImg}
        alt="logo"
        priority
        className="object-contain"
        fill
      />
    </button>
    <span className="mt-1 sm:text-xl font-bold text-white">
      飞机博彩第一门户
    </span>
  </div>
);

interface Props {
  label: string;
  href: string;
}

const ItemLink: React.FC<Props> = ({ label, href }) => {
  const pathname = usePathname();
  const isActive = pathname == href;

  return (
    <Link
      href={href || "#"}
      className={cn(
        "group relative px-3.5 py-1.5 duration-300 transition-colors rounded-sm",
        { "text-tertiary font-bold": isActive }
      )}
    >
      {label}
      <div
        className={cn(
          "absolute h-0.5 bg-gradient-to-r from-transparent via-tertiary/60 to-transparent w-0 group-hover:w-full transition-all duration-500 -bottom-0.5 left-0 rounded-full",
          { "w-full": pathname == href }
        )}
      />
    </Link>
  );
};

const MobileItemLink: React.FC<Props & { onClick: () => void }> = ({
  label,
  href,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname == href;

  return (
    <Link
      onClick={onClick}
      href={href || "#"}
      className={cn("relative flex items-center space-x-2.5 px-2 py-1", {
        "bg-tertiary/10 rounded-sm text-sm break-words": isActive,
      })}
    >
      <span className="bg-white/5 p-1 rounded-full">
        <ChevronRight
          className={cn("size-4 text-quaternary", {
            "text-tertiary": isActive,
          })}
        />
      </span>
      <span>{label}</span>
    </Link>
  );
};
