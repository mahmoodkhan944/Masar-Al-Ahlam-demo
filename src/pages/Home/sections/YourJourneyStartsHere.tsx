"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function YourJourneyStartsHere() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGSVGElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const { ref: cardRef, isVisible } = useRevealOnScroll({ threshold: 0.3 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/hero_immigration_journey_background.png)",
          transform: `translateY(${scrollY * 0.4}px)`,
          willChange: "transform",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-background/80" />
      </div>

      {}
      <svg
        ref={mapRef}
        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
        viewBox="0 0 1200 800"
        style={{
          animation: "drift 12s linear infinite",
        }}
      >
        <style>{`
          @keyframes drift {
            0% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(30px) translateY(-20px); }
            100% { transform: translateX(0) translateY(0); }
          }
        `}</style>
        <path
          d="M100,200 L150,180 L180,200 L200,220 L230,210 L250,230 L280,220 L300,240 M400,150 L450,130 L480,150 L510,140 L540,160 L570,150 M600,300 L650,280 L680,300 L710,290 L740,310 M200,400 L230,380 L260,400 L290,390 L320,410 M800,200 L850,180 L880,200 L910,190 L940,210 M500,500 L550,480 L580,500 L610,490 L640,510"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-secondary/60"
        />
        <circle cx="150" cy="190" r="4" fill="currentColor" className="text-primary" />
        <circle cx="450" cy="140" r="4" fill="currentColor" className="text-primary" />
        <circle cx="650" cy="290" r="4" fill="currentColor" className="text-primary" />
        <circle cx="850" cy="190" r="4" fill="currentColor" className="text-primary" />
      </svg>

      {}
      <div className="relative z-10 h-full flex items-end justify-center pb-20 px-4">
        <Card
          ref={cardRef}
          className={`glass-effect max-w-3xl w-full p-8 md:p-12 transform transition-all duration-[var(--duration-slow)] ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          } hover-lift`}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
            Your Journey Starts Here
          </h1>
          <p className="text-lg md:text-xl text-foreground/90 mb-8 max-w-2xl leading-relaxed">
            RapidLine Immigration provides expert guidance and personalized support
            to help you navigate your immigration journey with confidence and peace
            of mind.
          </p>
          <Button
            className="btn-primary group"
            size="lg"
          >
            Begin Your Journey
            <ArrowRight className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1" />
          </Button>
        </Card>
      </div>
    </section>
  );
}