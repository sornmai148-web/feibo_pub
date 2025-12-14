import { Container } from "@/components/molecules/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative h-[calc(100dvh-270px)] md:h-[calc(100dvh-240px)] special-bg">
      <Container className="flex flex-col space-y-2 justify-center items-center size-full">
        <h2 className="text-tertiary font-bold text-6xl xl:text-7xl">404</h2>
        <p className="text-quaternary">未找到页面</p>
        <Button className="bg-white text-secondary hover:bg-white/80" asChild>
          <Link href="/">返回首页</Link>
        </Button>
      </Container>
    </div>
  );
}
