"use client";

import { useLayoutEffect, useRef } from "react";
import { bindScrollReveal } from "@/lib/scroll-reveal";

export default function Reveal({ children, className = "", image = false, group = false, delay = 0 }: {
  children: React.ReactNode; className?: string; image?: boolean; group?: boolean; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (ref.current) return bindScrollReveal(ref.current, { image, group, delay });
  }, [image, group, delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
