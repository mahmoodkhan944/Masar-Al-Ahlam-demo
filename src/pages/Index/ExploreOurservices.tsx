"use client";

import { Briefcase, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "@/components/common/Link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const services = [
  {
    id: 1,
    icon: Briefcase,
    title: "Business Strategy"
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Innovation Consulting"
  },
  {
    id: 3,
    icon: Users,
    title: "Team Development"
  }
];

export default function ExploreOurServices() {
  const { ref, isVisible } = useRevealOnScroll({ threshold: 0.15 });

  return (
    <section
      ref={ref}
      className="bg-light-background py-16 px-6 transition-transform duration-[var(--duration-slow)] ease-[var(--ease-smooth)]"
      style={{
        transform: isVisible ? "translateY(-8px)" : "translateY(0)"
      }}
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center font-display text-4xl font-bold text-foreground-light">
          Explore Our Services
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.id}
                data-index={i}
                className={`group cursor-pointer border border-border bg-light-background shadow-soft transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-0.5 hover:shadow-medium ${
                  isVisible
                    ? i === 0
                      ? "animate-fade-in-up"
                      : i === 1
                        ? "animate-fade-in-up-delay-100"
                        : "animate-fade-in-up-delay-200"
                    : "opacity-0"
                }`}
              >
                <CardHeader className="items-center text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary-light transition-all duration-[var(--duration-medium)] ease-[var(--ease-spring)] group-hover:bg-accent-light group-hover:shadow-[0_0_20px_rgba(255,191,0,0.4)]">
                    <Icon className="size-8 text-primary transition-colors duration-[var(--duration-medium)] group-hover:text-accent" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground-light">
                    {service.title}
                  </CardTitle>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            variant="default"
            size="lg"
            className="bg-accent text-foreground-accent shadow-soft transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-medium active:translate-y-0 active:bg-accent-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Link to="/ServicesPage">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}