import Image from "next/image";

import heroWallPaper from "@/assets/images/hero.jpg";

export function HeroBanner() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero Banner"
      width={1920}
      height={1080}
    />
  );
}
