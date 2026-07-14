"use client";

import { useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { StaticImageData } from "next/image";
import Image from "next/image";

interface PageHeroProps {
  image: StaticImageData;
  alt: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({
  image,
  alt,
  title,
  subtitle,
}: PageHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        setParallaxOffset(-rect.top * 0.3);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 280, sm: 360, md: 440 },
        overflow: "hidden",
      }}
      aria-label={`${title} hero section`}
    >
      {/* Background image — oversized to allow parallax shift without blank edges */}
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "2%",
          height: "200%",
          transform: `translateY(${parallaxOffset}px)`,
          willChange: "transform",
        }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center center" }}
          sizes="100vw"
        />
      </Box>
      {/* Dark purple gradient overlay */}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
        }}
      />

      {/* Text content */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          pb: { xs: 4, md: 6 },
          px: { xs: 3, md: 8 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            color: "#FFFFFF",
            fontWeight: 700,
            textShadow: "0 2px 12px rgba(0,0,0,0.5)",
            mb: subtitle ? 1 : 0,
            fontSize: { xs: "2rem", sm: "2.75rem", md: "3.5rem" },
          }}
          className="animate-fade-in-up"
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "rgba(255,255,255,0.88)",
              fontWeight: 400,
              textShadow: "0 1px 8px rgba(0,0,0,0.4)",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
            className="animate-fade-in-up stagger-2"
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
