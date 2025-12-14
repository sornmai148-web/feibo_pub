"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import Image, { type StaticImageData } from "next/image";

import { Autoplay, Pagination, EffectFade, A11y } from "swiper/modules";
import { cn } from "@/lib/utils";

interface Media {
  src: StaticImageData;
  alt: string;
}

interface Props {
  items: Array<Media>;
}

export const BannerSlider: React.FC<Props> = ({ items }) => {
  return (
    <div className="relative pt-4 max-sm:hidden">
      <Swiper
        loop
        effect="fade"
        speed={4000}
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
          bulletClass:
            "!h-2 !w-2 bg-white/60 !rounded-md !mr-1 !px-0 flex items-center !space-x-1",
          bulletActiveClass: "!w-6 h-2 !rounded-sm !bg-amber-300",
        }}
        modules={[Autoplay, EffectFade, Pagination, A11y]}
        className="banner-slider relative"
      >
        {(items || [])?.map((x, i) => (
          <SwiperSlide key={i}>
            <Item {...x} />
          </SwiperSlide>
        ))}

        {/*-- Button Navigation --*/}
      </Swiper>
      {/* -- Pagination Bullets --*/}
      <div className="custom-pagination z-10 absolute bottom-2 w-full flex justify-center" />
    </div>
  );
};

const Item: React.FC<Media> = ({ src, alt }) => {
  return (
    <div className={cn("relative aspect-[4/1.15] rounded-xl overflow-hidden")}>
      <Image
        sizes="(min-width: 1024px) 50vw, 100vw"
        src={src}
        alt={alt}
        className="rounded-xl object-cover object-[25%_40%]"
        priority
        fill
      />
      <div className="bg-gradient-to-b size-full left-0 absolute right-0 bottom-0 from-transparent to-tertiary/30" />
    </div>
  );
};
