import { getAllFilter } from "@/api";
import { Annoucement } from "@/components/molecules/annoucement";
import { BannerSlider } from "@/components/molecules/banner";
import { Container } from "@/components/molecules/container";
import { SearchBar } from "@/components/molecules/search-bar";
import { FilterOption } from "@/components/organisms/filter-section";
import { SearchMobileSection } from "@/components/organisms/search-section/mobile";

import Banner1 from "@/public/images/banner-off-1.jpg";
import Banner2 from "@/public/images/banner-off-2.jpg";
import Banner3 from "@/public/images/banner-off-3.jpg";
import Banner4 from "@/public/images/banner-off-4.jpg";
import Banner5 from "@/public/images/banner-off-5.jpg";
import Banner6 from "@/public/images/banner-off-6.jpg";

import { NextPage } from "next";

interface PageProps {
  searchParams: Promise<QueryParams>;
}

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const queryParams = await searchParams;
  const keywords = queryParams?.keywords;

  const parentLabel = queryParams?.parent_label;
  const subLabel = queryParams?.sub_label;
  const fieldId = +queryParams?.field_id;
  const fieldValue = queryParams?.filter_value?.trim();

  const filterData = await getAllFilter();

  return (
    <div className="relative special-bg min-h-[calc(100dvh-150px)]">
      <Container>
        <BannerSlider
          items={[
            { src: Banner6, alt: "banner_6" },
            { src: Banner2, alt: "banner_2" },
            { src: Banner1, alt: "banner_1" },
            { src: Banner3, alt: "banner_3" },
            { src: Banner4, alt: "banner_4" },
            { src: Banner5, alt: "banner_5" },
          ]}
        />
        <div className="py-2">
          <Annoucement />
        </div>

        <div className="py-1 md:py-4">
          <SearchBar value={keywords} />
        </div>

        <FilterOption
          filterType1={filterData?.categoryCodes || []}
          filterType2={filterData?.["meta.gameCompany"] || []}
        />

        {/*-- Online see on mobile , for larch screen is available in search screen --*/}
        <div className="pt-2 sm:hidden">
          <SearchMobileSection
            keywords={keywords}
            parent_label={parentLabel}
            sub_label={subLabel}
            field_id={fieldId}
            filter_value={fieldValue}
          />
        </div>
      </Container>
    </div>
  );
};

export default Page;
