"use client";

import { Button } from "@/components/ui/button";
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
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactUsToday() {
  const { ref: sectionRef, isVisible } = useRevealOnScroll({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distanceX = mousePosition.x - buttonCenterX;
    const distanceY = mousePosition.y - buttonCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 150;
    const magnetStrength = 0.3;

    if (distance < maxDistance) {
      const pullX = distanceX * magnetStrength * (1 - distance / maxDistance);
      const pullY = distanceY * magnetStrength * (1 - distance / maxDistance);
      setButtonPosition({ x: pullX, y: pullY });
    } else {
      setButtonPosition({ x: 0, y: 0 });
    }
  }, [mousePosition]);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    form.reset();
  };

  const [imagePan, setImagePan] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleImagePan = (e: MouseEvent) => {
      const panX = (e.clientX / window.innerWidth - 0.5) * 20;
      const panY = (e.clientY / window.innerHeight - 0.5) * 20;
      setImagePan({ x: panX, y: panY });
    };

    window.addEventListener("mousemove", handleImagePan);
    return () => window.removeEventListener("mousemove", handleImagePan);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-light-background"
    >
      <div className="grid h-full min-h-screen grid-cols-1 lg:grid-cols-2">
        {}
        <div className="relative h-64 overflow-hidden lg:h-auto">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
            style={{
              backgroundImage: "url(https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/contact_office_space.png)",
              transform: `translate(${imagePan.x}px, ${imagePan.y}px) scale(1.1)`,
            }}
          />
          <div className="absolute inset-0 bg-primary/40" />
          <div
            className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="max-w-md text-center">
              <h1 className="mb-4 font-display text-4xl font-bold text-white lg:text-5xl">
                Get in Touch
              </h1>
              <p className="text-lg text-white/90">
                Have questions about your immigration journey? We're here to
                help you every step of the way.
              </p>
            </div>
          </div>
        </div>

        {}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <div
            className={`w-full max-w-lg rounded-lg bg-light-background p-8 shadow-strong transition-all duration-700 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="mb-2 font-display text-2xl font-bold text-foreground-light">
              Contact RapidLine Immigration
            </h2>
            <p className="mb-6 text-sm text-foreground-muted-light">
              Fill out the form below and we'll get back to you shortly.
            </p>

            <Form {...form}>
              <form
                ref={formRef}
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground-light">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John Doe"
                          className="transition-all duration-300 focus:-translate-y-1 focus:shadow-medium"
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
                      <FormLabel className="text-foreground-light">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="john@example.com"
                          className="transition-all duration-300 focus:-translate-y-1 focus:shadow-medium"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground-light">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="(555) 123-4567"
                          className="transition-all duration-300 focus:-translate-y-1 focus:shadow-medium"
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
                      <FormLabel className="text-foreground-light">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Tell us about your immigration needs..."
                          className="min-h-32 resize-none transition-all duration-300 focus:-translate-y-1 focus:shadow-medium"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  ref={buttonRef}
                  type="submit"
                  className="w-full transition-all duration-300"
                  style={{
                    transform: `translate(${buttonPosition.x}px, ${buttonPosition.y}px)`,
                  }}
                >
                  <Send className="mr-2 size-4" />
                  Send Message
                </Button>
              </form>
            </Form>

            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-2 text-sm font-semibold text-foreground-light">
                Other ways to reach us:
              </p>
              <div className="space-y-2 text-sm text-foreground-muted-light">
                <p>
                  <strong>Phone:</strong> (555) 123-4567
                </p>
                <p>
                  <strong>Email:</strong> info@rapidlineimmigration.com
                </p>
                <p>
                  <strong>Hours:</strong> Mon-Fri: 8am-6pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}