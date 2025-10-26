"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/common/Link";
import { Mail, Phone } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { useEffect, useRef, useState } from "react";

export default function GetInTouchWithOurImmigrationExpertsSection() {
  const { ref: cardRef, isVisible } = useRevealOnScroll<HTMLDivElement>({
    once: true,
    threshold: 0.15,
  });

  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setUnderlineWidth(100), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.15;
      const deltaY = (e.clientY - centerY) * 0.15;
      setCursorPos({ x: deltaX, y: deltaY });
    }
  };

  const handleMouseLeave = () => {
    setCursorPos({ x: 0, y: 0 });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center bg-[url(https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/blurred_city_skyline_backdrop.png)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-light-background/70 backdrop-blur-sm" />

      <div
        ref={cardRef}
        className={`relative z-10 w-full max-w-2xl mx-4 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out-back)] ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <Card className="shadow-[0_20px_60px_rgba(0,0,0,0.15)] bg-light-background/95 backdrop-blur-md border border-border/50 rounded-xl px-8 py-10 md:px-12 md:py-14">
          <div className="text-center space-y-6">
            <div
              className={`transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground-light leading-tight">
                Get in Touch with Our Immigration Experts
              </h1>
              <div className="mt-4 mx-auto h-1 bg-primary rounded-full overflow-hidden max-w-xs">
                <div
                  className="h-full bg-accent transition-all duration-700 ease-[var(--ease-out-back)]"
                  style={{ width: `${underlineWidth}%` }}
                />
              </div>
            </div>

            <p
              className={`text-lg text-foreground-muted-light max-w-xl mx-auto transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              Our dedicated team at RapidLine Immigration is ready to assist you
              with personalized immigration solutions. Reach out today and take
              the first step toward your new future.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Link
                to="tel:(555) 123-4567"
                className="inline-flex items-center gap-2 text-foreground-light hover:text-primary transition-colors"
              >
                <Phone className="size-5" />
                <span className="font-medium">(555) 123-4567</span>
              </Link>
              <span className="hidden sm:inline text-border-strong">|</span>
              <Link
                to="mailto:info@rapidlineimmigration.com"
                className="inline-flex items-center gap-2 text-foreground-light hover:text-primary transition-colors"
              >
                <Mail className="size-5" />
                <span className="font-medium">info@rapidlineimmigration.com</span>
              </Link>
            </div>

            <div
              className={`pt-4 transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] delay-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
            >
              <Button
                ref={buttonRef}
                size="lg"
                className="relative bg-accent text-foreground-accent hover:bg-accent-hover active:bg-accent-active shadow-medium hover:shadow-strong transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)] px-8 py-4 text-base font-semibold rounded-md animate-pulse hover:animate-none focus-ring"
                style={{
                  transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
                }}
                asChild
              >
                <Link to="/ContactUsPage">
                  Schedule a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}