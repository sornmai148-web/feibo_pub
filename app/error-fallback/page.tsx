import { Container } from "@/components/molecules/container";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="relative h-[calc(100dvh-285px)] md:h-[calc(100dvh-240px)] special-bg">
      <Container className="flex flex-col space-y-4 justify-center items-center size-full">
        <div>
          <TriangleAlert className="text-yellow-400 size-9 sm:size-12" />
        </div>
        <h2 className="text-tertiary font-bold text-3xl xl:text-4xl">
          服务器开小差了
        </h2>
        <p className="text-quaternary">请稍后再试</p>

        <Button className="max-sm:hidden" variant="outline" asChild>
          <Link href={ROUTES.HOME}>返回首页</Link>
        </Button>

        <Button className="sm:hidden" variant="outline" asChild>
          <Link href={ROUTES.$HOME_HEADER("true")}>返回首页</Link>
        </Button>
      </Container>
    </div>
  );
}
