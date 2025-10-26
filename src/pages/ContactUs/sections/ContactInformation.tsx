"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

type FormData = {
  name: string;
  email: string;
  message: string;
};

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "(555) 123-4567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@rapidlineimmigration.com",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Main St, Springfield",
  },
];

export default function ContactInformation() {
  const { ref, isVisible } = useRevealOnScroll({ once: true, threshold: 0.15 });
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [mapHover, setMapHover] = useState(false);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] bg-dark-background text-foreground-dark py-20 px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url(https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/contact_background_texture.png)] bg-cover bg-center opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <Card
          className={`bg-dark-background/95 backdrop-blur-md border border-border-strong shadow-strong rounded-lg overflow-hidden transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-0">
              {}
              <div
                className={`p-8 lg:p-12 transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] delay-100 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
              >
                <h2 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-foreground-dark">
                  Get in Touch
                </h2>
                <p className="text-muted-dark-background mb-8">
                  We're here to help with your immigration needs.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground-dark">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Your full name"
                              className="bg-dark-background/60 border-border text-foreground-dark placeholder:text-muted-dark-background focus:shadow-[0_0_0_4px_rgba(66,153,225,0.3)] focus:border-primary focus:-translate-y-1 transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground-dark">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="your.email@example.com"
                              className="bg-dark-background/60 border-border text-foreground-dark placeholder:text-muted-dark-background focus:shadow-[0_0_0_4px_rgba(66,153,225,0.3)] focus:border-primary focus:-translate-y-1 transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground-dark">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your immigration needs..."
                              className="bg-dark-background/60 border-border text-foreground-dark placeholder:text-muted-dark-background focus:shadow-[0_0_0_4px_rgba(66,153,225,0.3)] focus:border-primary focus:-translate-y-1 transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)] min-h-32"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent-hover active:bg-accent-active text-foreground-accent font-semibold py-3 rounded-md shadow-medium hover:shadow-strong hover:scale-[1.02] active:scale-[0.98] transition-all duration-[var(--duration-medium)] ease-[var(--ease-spring)]"
                    >
                      Send Message
                    </Button>
                  </form>
                </Form>
              </div>

              {}
              <div className="bg-primary/10 p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl font-display font-bold mb-8 text-foreground-dark">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  {contactItems.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={i}
                        data-index={i}
                        className={`flex items-start gap-4 transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] ${
                          isVisible
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-8"
                        }`}
                        style={{
                          transitionDelay: isVisible ? `${(i + 3) * 100}ms` : "0ms",
                        }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-dark-background font-medium mb-1">
                            {item.label}
                          </p>
                          <p className="text-foreground-dark font-semibold">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {}
        <div
          className={`mt-12 relative overflow-hidden rounded-lg shadow-strong transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] delay-[600ms] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseEnter={() => setMapHover(true)}
          onMouseLeave={() => setMapHover(false)}
        >
          <div
            className={`relative h-96 bg-[url(https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/contact_map_location.png)] bg-cover bg-center transition-transform duration-[var(--duration-slow)] ease-[var(--ease-smooth)] ${
              mapHover ? "scale-105" : "scale-100"
            }`}
          >
            {}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-accent rounded-full shadow-strong flex items-center justify-center hover:scale-110 hover:bg-accent-hover transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)] cursor-pointer"
                  onClick={() => setHoveredPin(0)}
                  aria-label="Main office location"
                >
                  <MapPin className="w-5 h-5 text-foreground-accent" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="font-medium">RapidLine Immigration</p>
                <p className="text-xs">123 Main St, Springfield</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/3 left-2/3 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-secondary rounded-full shadow-medium flex items-center justify-center hover:scale-110 hover:bg-secondary-hover transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)] cursor-pointer"
                  onClick={() => setHoveredPin(1)}
                  aria-label="Nearby landmark"
                >
                  <MapPin className="w-4 h-4 text-foreground-secondary" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">City Center</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  );
}