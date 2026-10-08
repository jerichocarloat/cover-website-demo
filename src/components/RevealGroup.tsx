"use client";

import { useLayoutEffect, useRef } from "react";
import { bindScrollReveal } from "@/lib/scroll-reveal";

export default function RevealGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const cleanups = Array.from(ref.current.children)
      .filter((child): child is HTMLElement => child instanceof HTMLElement)
      .map((child, delay) => bindScrollReveal(child, { delay }));
    return () => cleanups.forEach(cleanup => cleanup());
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
