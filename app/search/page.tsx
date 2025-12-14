import { Container } from "@/components/molecules/container";
import { SearchBar } from "@/components/molecules/search-bar";
import { SearchSection } from "@/components/organisms/search-section";
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

  return (
    <div className="relative special-bg min-h-[81dvh]">
      <Container>
        <div className="py-5 sticky top-14 z-30">
          <SearchBar value={keywords} />
        </div>

        <div className="pt-2">
          <SearchSection
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
