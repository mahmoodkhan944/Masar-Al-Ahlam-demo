"use client";

import { ArrowRight, FileText, Globe, Phone, BookOpen, Users, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/components/common/Link";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

const resources = [
  {
    id: 1,
    label: "USCIS Official Website",
    url: "https://www.uscis.gov/",
    icon: Globe
  },
  {
    id: 2,
    label: "Visa Application Forms",
    url: "https://travel.state.gov/content/travel/en/us-visas.html",
    icon: FileText
  },
  {
    id: 3,
    label: "Immigration Support Hotline",
    url: "tel:+15551234567",
    icon: Phone
  },
  {
    id: 4,
    label: "Legal Resources & Guides",
    url: "https://www.immigrationlawhelp.org/",
    icon: BookOpen
  },
  {
    id: 5,
    label: "Community Support Groups",
    url: "https://www.uscis.gov/citizenship-resource-center",
    icon: Users
  },
  {
    id: 6,
    label: "Find Immigration Office",
    url: "https://www.uscis.gov/about-us/find-a-uscis-office",
    icon: MapPin
  }
];

export default function EssentialImmigrationLinks() {
  const { ref, isVisible } = useRevealOnScroll({ once: true, threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative bg-light-background py-16 px-6 sm:px-12 lg:px-24"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgb(0 0 0 / 0.02) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(0 0 0 / 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px"
      }}
    >
      <div className="mx-auto max-w-7xl">
        <h2
          className={`font-display mb-12 text-center text-3xl font-semibold text-foreground-light sm:text-4xl lg:text-5xl transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Essential Immigration Links
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource, i) => {
            const Icon = resource.icon;
            return (
              <Link
                key={resource.id}
                to={resource.url}
                newTab
                data-index={i}
                className="group block"
              >
                <Card
                  className={`h-full cursor-pointer border border-border bg-light-background shadow-soft transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-medium ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{
                    animationDelay: `${i * 100}ms`
                  }}
                >
                  <CardContent className="flex h-full flex-col items-start gap-4 p-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors duration-[var(--duration-fast)] group-hover:bg-primary group-hover:text-foreground-primary">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-sans text-base font-medium text-foreground-light">
                        {resource.label}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-all duration-[var(--duration-medium)] ease-[var(--ease-spring)] group-hover:translate-x-2 group-hover:opacity-100">
                      <span className="underline">Visit Resource</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}