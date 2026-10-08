import Image, { type ImageProps } from "next/image";
import { assetPath } from "@/lib/site";

/** Public assets need the deployment prefix; Next links receive it automatically. */
export default function SiteImage({ src, ...props }: ImageProps) {
  return <Image src={typeof src === "string" ? assetPath(src) : src} {...props} />;
}
