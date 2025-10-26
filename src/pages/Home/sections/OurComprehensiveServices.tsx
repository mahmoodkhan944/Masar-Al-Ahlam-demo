"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function OurComprehensiveServices() {
  const { ref, isVisible } = useRevealOnScroll({ once: true, threshold: 0.2 });
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    const onPointerEnter = () => clearInterval(interval);
    const onPointerLeave = () => {
      clearInterval(interval);
      const newInterval = setInterval(() => {
        api.scrollNext();
      }, 5000);
      return () => clearInterval(newInterval);
    };

    const container = api.containerNode();
    if (container) {
      container.addEventListener("pointerenter", onPointerEnter);
      container.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      clearInterval(interval);
      if (container) {
        container.removeEventListener("pointerenter", onPointerEnter);
        container.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [api]);

  const services = [
    { id: 1, title: "Visa applications" },
    { id: 2, title: "Permanent residency assistance" },
    { id: 3, title: "Work and study permits" },
    { id: 4, title: "Citizenship guidance" },
    { id: 5, title: "Family sponsorship" },
  ];

  const carouselImages = [
    { id: 1, src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/visa_consultation_office.png", alt: "Visa consultation session" },
    { id: 2, src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/immigration_documents_review.png", alt: "Immigration documents review" },
    { id: 3, src: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/client_success_celebration.png", alt: "Client success celebration" },
  ];

  return (
    <section
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-light-background"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-foreground-light text-center mb-12">
          Our Comprehensive Services
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {}
          <div className="space-y-6">
            {services.map((service, i) => (
              <div
                key={service.id}
                data-index={i}
                className={`flex items-start gap-4 ${
                  isVisible ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{
                  animationDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-soft">
                  <Check className="w-5 h-5 text-foreground-primary" />
                </div>
                <p className="text-lg text-foreground-light font-medium pt-1">
                  {service.title}
                </p>
              </div>
            ))}
          </div>

          {}
          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{
                loop: true,
                align: "start",
              }}
              className="w-full"
            >
              <CarouselContent>
                {carouselImages.map((image, i) => (
                  <CarouselItem key={image.id} data-index={i}>
                    <div className="rounded-lg overflow-hidden shadow-medium hover:shadow-strong transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 lg:-left-12" />
              <CarouselNext className="-right-4 lg:-right-12" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}