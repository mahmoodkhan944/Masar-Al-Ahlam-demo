"use client";

import { Award, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function WhyChooseRapidLineImmigration() {
  const { ref: containerRef, isVisible } = useRevealOnScroll({
    once: true,
    threshold: 0.1,
  });

  const benefits = [
    {
      icon: Shield,
      label: "Personalized immigration solutions tailored to individual needs",
    },
    {
      icon: Users,
      label: "Experienced and knowledgeable team of immigration professionals",
    },
    {
      icon: Award,
      label: "High success rate with client cases and dedicated support",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-light-background py-16 lg:py-24">
      {}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 20px, currentColor 20px, currentColor 21px)",
        }}
      />

      <div className="container relative mx-auto px-6" ref={containerRef}>
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground-light lg:text-4xl">
            Why Choose RapidLine Immigration?
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={i}
                data-index={i}
                className={`group relative border border-border bg-light-background p-6 shadow-soft transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-medium ${
                  isVisible
                    ? i === 0
                      ? "animate-fade-in-up"
                      : i === 1
                        ? "animate-fade-in-up-delay-100"
                        : "animate-fade-in-up-delay-200"
                    : "opacity-0"
                }`}
              >
                <CardContent className="flex flex-col items-center gap-4 p-0 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform duration-[var(--duration-medium)] ease-[var(--ease-spring)] group-hover:scale-110 group-hover:animate-pulse">
                    <Icon className="h-8 w-8 text-primary" strokeWidth={2} />
                  </div>
                  <p className="text-base leading-relaxed text-foreground-light">
                    {benefit.label}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}