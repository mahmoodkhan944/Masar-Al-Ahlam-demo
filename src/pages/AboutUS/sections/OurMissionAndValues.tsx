"use client";

import { Award, Heart, Shield } from "lucide-react";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function OurMissionAndValues() {
  const { ref: ref1, isVisible: isVisible1 } = useRevealOnScroll({
    once: true,
    threshold: 0.2,
  });
  const { ref: ref2, isVisible: isVisible2 } = useRevealOnScroll({
    once: true,
    threshold: 0.2,
  });
  const { ref: ref3, isVisible: isVisible3 } = useRevealOnScroll({
    once: true,
    threshold: 0.2,
  });

  const coreValues = [
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "We prioritize transparent and honest communication throughout your immigration journey.",
      delay: "0ms",
      ref: ref1,
      isVisible: isVisible1,
    },
    {
      icon: Heart,
      title: "Client-Focused Care",
      description: "Personalized immigration solutions tailored to your unique needs and circumstances.",
      delay: "150ms",
      ref: ref2,
      isVisible: isVisible2,
    },
    {
      icon: Award,
      title: "Excellence & Expertise",
      description: "Experienced professionals with high success rates in immigration cases.",
      delay: "300ms",
      ref: ref3,
      isVisible: isVisible3,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-light-background py-24">
      {}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundAttachment: "fixed",
        }}
      />

      <div className="container relative z-10 mx-auto max-w-6xl px-6">
        {}
        <div className="mb-20 text-center">
          <h2 className="font-display text-4xl font-bold text-foreground-light md:text-5xl lg:text-6xl">
            Our Mission and Values
          </h2>
          <p className="mt-6 text-lg text-foreground-muted-light md:text-xl">
            Guiding principles that drive our commitment to exceptional immigration services
          </p>
        </div>

        {}
        <div className="grid gap-12 md:grid-cols-3">
          {coreValues.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={i}
                data-index={i}
                ref={value.ref}
                className="group flex flex-col items-center text-center"
                style={{
                  opacity: value.isVisible ? 1 : 0,
                  transform: value.isVisible ? "translateY(0)" : "translateY(2rem)",
                  transition: `opacity var(--duration-medium) var(--ease-smooth) ${value.delay}, transform var(--duration-medium) var(--ease-smooth) ${value.delay}`,
                }}
              >
                {}
                <div
                  className="mb-6 flex size-32 items-center justify-center rounded-full bg-primary shadow-soft transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] group-hover:scale-[1.08] group-hover:shadow-medium"
                >
                  <Icon className="size-16 text-foreground-primary" strokeWidth={1.5} />
                </div>

                {}
                <h3 className="relative mb-4 font-display text-2xl font-semibold text-foreground-light">
                  {value.title}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:w-full" />
                </h3>

                {}
                <p className="max-w-xs text-foreground-muted-light">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}