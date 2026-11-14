"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollAnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion accessibility
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let ctx: gsap.Context | null = null;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Query elements marked for parallax slide
        const parallaxElements = document.querySelectorAll<HTMLElement>("[data-parallax]");

        parallaxElements.forEach((el) => {
          const speed = parseFloat(el.getAttribute("data-parallax-speed") || "0.2");
          const direction = el.getAttribute("data-parallax-direction") || "y";

          if (direction === "x") {
            gsap.to(el, {
              xPercent: speed * 30,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          } else {
            gsap.to(el, {
              yPercent: speed * 40,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        });

        ScrollTrigger.refresh();
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
