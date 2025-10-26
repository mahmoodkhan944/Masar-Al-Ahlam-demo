"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    author: "Jane D.",
    quote:
      "RapidLine Immigration made my immigration process smooth and stress-free. Highly recommend!",
    position: "Satisfied Client",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/jane_d_testimonial.png",
  },
  {
    author: "Carlos M.",
    quote:
      "Their team is professional and supportive. I got my visa approval faster than expected.",
    position: "Happy Client",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/carlos_m_testimonial.png",
  },
  {
    author: "Aisha K.",
    quote:
      "Exceptional guidance throughout my residency application. Truly experts in their field.",
    position: "Permanent Resident",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/aisha_k_testimonial.png",
  },
  {
    author: "Michael T.",
    quote:
      "From consultation to approval, every step was transparent and efficient. Thank you!",
    position: "Work Permit Holder",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/michael_t_testimonial.png",
  },
  {
    author: "Priya S.",
    quote:
      "Their personalized approach made all the difference. I felt supported every step of the way.",
    position: "Family Sponsor",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/priya_s_testimonial.png",
  },
];

export default function SuccessStories() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-light-background py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl font-bold text-center mb-12 text-foreground-light">
          Success Stories
        </h2>

        <Carousel
          opts={{
            align: "center",
            loop: false,
            dragFree: true,
          }}
          className="w-full"
          orientation="horizontal"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, i) => (
              <CarouselItem
                key={i}
                data-index={i}
                className="pl-4 md:basis-3/4 lg:basis-2/3"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <Card
                  className={`transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover-lift ${
                    activeIndex === i ? "scale-[1.02]" : "scale-100"
                  }`}
                >
                  <CardContent className="flex flex-col md:flex-row items-start gap-6 p-8">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover flex-shrink-0 shadow-soft"
                    />
                    <div className="flex flex-col justify-center flex-1">
                      <p className="text-foreground-light text-lg italic leading-relaxed mb-4">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground-light">
                          {testimonial.author}
                        </span>
                        <span className="text-sm text-foreground-muted-light">
                          {testimonial.position}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}