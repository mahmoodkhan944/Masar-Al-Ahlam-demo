"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "@/components/common/Link";

export default function FrequentlyAskedQuestions() {
  const faqs = [
    {
      id: 1,
      question: "What immigration services does RapidLine Immigration offer?",
      answer: "RapidLine Immigration provides comprehensive immigration support including visa applications, permanent residency assistance, work and study permits, citizenship guidance, family sponsorship, and business immigration services."
    },
    {
      id: 2,
      question: "How long does the visa application process typically take?",
      answer: "Processing times vary depending on the type of visa and individual circumstances. Our experienced team works diligently to ensure your application is submitted correctly and efficiently, often resulting in faster approval times than expected."
    },
    {
      id: 3,
      question: "Do you offer consultation services?",
      answer: "Yes, we offer personalized consultation services to assess your immigration needs and provide tailored solutions. Contact us at (555) 123-4567 or info@rapidlineimmigration.com to schedule your consultation."
    },
    {
      id: 4,
      question: "What makes RapidLine Immigration different from other immigration services?",
      answer: "We pride ourselves on our personalized approach, high success rate, experienced team of immigration professionals, and comprehensive support throughout your entire immigration journey. We simplify complex immigration laws and provide transparent, honest communication at every step."
    },
    {
      id: 5,
      question: "Can you help with family sponsorship applications?",
      answer: "Absolutely. Our team specializes in family sponsorship cases and will guide you through the entire process, ensuring all documentation is complete and submitted correctly to maximize your chances of approval."
    },
    {
      id: 6,
      question: "What are your office hours?",
      answer: "We are available Monday through Friday from 8am to 6pm. Our dedicated support team is also available via phone at (555) 123-4567 and email at info@rapidlineimmigration.com to assist you with your immigration needs."
    }
  ];

  return (
    <section className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground-light mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground-muted-light text-lg">
            Find answers to common questions about our immigration services
          </p>
        </div>

        <div className="bg-light-background rounded-lg shadow-soft p-6 sm:p-8">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.id}
                value={`item-${faq.id}`}
                data-index={i}
                className="border border-border rounded-md px-4 transition-all duration-[var(--duration-medium)] hover:border-primary/40"
              >
                <AccordionTrigger className="text-foreground-light font-semibold hover:text-primary transition-colors duration-[var(--duration-fast)]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground-muted-light leading-relaxed animate-fade-in-up">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 text-center">
          <p className="text-foreground-muted-light mb-4">
            Still have questions? We're here to help.
          </p>
          <Link
            to="/ContactUsPage"
            className="inline-flex items-center justify-center rounded-md bg-accent text-foreground-accent px-6 py-3 font-semibold hover:bg-accent-hover hover:shadow-medium hover:-translate-y-0.5 active:bg-accent-active active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}