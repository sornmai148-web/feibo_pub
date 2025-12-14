import Image from "next/image";
import LogoImg from "@/public/images/feibo-logo.jpg";
import Link from "next/link";
import { Container } from "@/components/molecules/container";
import { Megaphone, PhoneCall, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/config/routes";

export const Footer = () => {
  const Year = new Date().getFullYear();
  return (
    <footer className="bg-primary">
      <Container>
        <nav className="grid gap-6 lg:grid-cols-2 w-full py-6">
          <div className="flex items-center space-x-3">
            {/*-- This logo navigation used only with large screen only --*/}
            <Link
              href={ROUTES.HOME}
              className="max-sm:hidden relative shrink-0 border-amber-400 size-12 sm:size-16 rounded-lg border-[3px] overflow-hidden"
            >
              <Image
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={LogoImg}
                alt="feibo logo"
                priority
                className="object-contain shrink-0"
                fill
              />
            </Link>

            {/*-- This logo navigation used only with mobile --*/}
            <Link
              href={ROUTES.$HOME_HEADER("true")}
              className="sm:hidden relative shrink-0 border-amber-400 size-12 sm:size-16 rounded-lg border-[3px] overflow-hidden"
            >
              <Image
                sizes="(min-width: 1024px) 50vw, 100vw"
                src={LogoImg}
                alt="feibo logo"
                priority
                className="object-contain shrink-0"
                fill
              />
            </Link>

            <span className="mt-1 sm:w-3/4 sm:text-sm md:text-base max-sm:text-[13px] font-medium leading-tight text-white break-words">
              飞博隶属土豆担保旗下，力争打造飞机博彩第一门户，为广大玩家提供最公平最有保障的好游戏。
            </span>
          </div>

          <div
            id="lianxi"
            className={cn(
              "lg:flex lg:items-center lg:justify-end max-lg:bg-gradient-to-r max-lg:from-tertiary/10 via-white/10 to-tertiary/10 rounded-md md:py-4 lg:space-x-6 font-medium text-white",
              "max-lg:grid max-lg:grid-cols-3 max-lg:py-3"
            )}
          >
            <Link
              href="https://t.me/tdqg88"
              target="_blank"
              className="group flex items-center border-r border-white/10 justify-center space-x-1.5"
            >
              <span>
                <UsersRound className="text-tertiary max-sm:size-5 group-hover:scale-105 duration-300 transition-transform" />
              </span>
              <span className="max-sm:text-sm">开群</span>
            </Link>

            <Link
              href="https://t.me/feibo"
              target="_blank"
              className="flex items-center justify-center border-r border-white/10 space-x-1.5 group"
            >
              <span>
                <Megaphone className="text-tertiary max-sm:size-5 group-hover:scale-105 duration-300 transition-transform" />
              </span>
              <span className="max-sm:text-sm">官方频道</span>
            </Link>

            <Link
              href="https://t.me/tdqg33"
              target="_blank"
              className="flex items-center justify-center space-x-1.5 group"
            >
              <span>
                <PhoneCall className="max-sm:size-5 text-tertiary group-hover:scale-105 duration-300 transition-transform" />
              </span>
              <span className="max-sm:text-sm">客服</span>
            </Link>
          </div>
        </nav>

        <div className="pb-4 max-sm:pt-2 sm:pt-4 flex flex-col space-y-4">
          <div className="w-5/6 mx-auto h-[1px] bg-gradient-to-r from-white/5 via-white/20 to-white/5" />
          <p className="text-quaternary font-medium max-sm:text-sm text-center">
            版权所有 © {Year} 飞博网
          </p>
        </div>
      </Container>
    </footer>
  );
};
