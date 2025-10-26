"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  expandedBio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Emily Johnson",
    position: "Senior Immigration Consultant",
    bio: "Expert in visa applications and immigration law",
    expandedBio:
      "Emily has over 10 years of experience helping clients navigate immigration laws and secure visas successfully. She specializes in complex visa cases and has helped hundreds of families achieve their immigration goals. Her dedication to client success and deep knowledge of immigration procedures make her an invaluable asset to our team.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/emily_johnson_portrait.png",
  },
  {
    id: 2,
    name: "Michael Lee",
    position: "Legal Advisor",
    bio: "Specializes in immigration compliance and legal guidance",
    expandedBio:
      "Michael specializes in immigration law and provides legal guidance to ensure compliance and successful applications. With a background in international law and extensive courtroom experience, he has successfully represented clients in various immigration matters. His analytical approach and attention to detail ensure that every case is handled with the utmost care and professionalism.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/michael_lee_portrait.png",
  },
  {
    id: 3,
    name: "Sarah Chen",
    position: "Family Sponsorship Specialist",
    bio: "Dedicated to reuniting families through immigration",
    expandedBio:
      "Sarah brings compassion and expertise to family sponsorship cases, having helped over 200 families reunite across borders. Her empathetic approach combined with thorough knowledge of family immigration policies ensures that each case receives personalized attention. She is fluent in three languages and understands the cultural nuances that can impact immigration proceedings.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/sarah_chen_portrait.png",
  },
  {
    id: 4,
    name: "David Martinez",
    position: "Business Immigration Consultant",
    bio: "Expert in work permits and business visas",
    expandedBio:
      "David specializes in business immigration, helping entrepreneurs and corporations navigate work permits and investor visas. With 8 years of experience in corporate immigration law, he has facilitated the relocation of numerous executives and skilled workers. His strategic approach helps businesses maintain compliance while efficiently managing their international workforce.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/david_martinez_portrait.png",
  },
  {
    id: 5,
    name: "Priya Sharma",
    position: "Student Visa Coordinator",
    bio: "Guiding students to educational opportunities abroad",
    expandedBio:
      "Priya has dedicated her career to helping students achieve their academic dreams abroad. She has extensive knowledge of study permit requirements across multiple countries and maintains relationships with educational institutions worldwide. Her patient guidance has helped over 500 students successfully obtain study permits and settle into their new academic environments.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/priya_sharma_portrait.png",
  },
  {
    id: 6,
    name: "James O'Connor",
    position: "Citizenship & Residency Expert",
    bio: "Specialist in permanent residency and citizenship applications",
    expandedBio:
      "James has a proven track record in permanent residency and citizenship applications, with a success rate exceeding 95%. His meticulous approach to documentation and deep understanding of residency requirements have made him a trusted advisor for clients seeking long-term immigration solutions. He takes pride in helping clients achieve their goal of calling a new country home.",
    image: "https://wpvc-images.s3.us-east-1.amazonaws.com/images/1413973/img/james_oconnor_portrait.png",
  },
];

export default function MeetOurTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { ref: row1Ref, isVisible: isRow1Visible } = useRevealOnScroll({
    once: true,
    threshold: 0.1,
  });

  const { ref: row2Ref, isVisible: isRow2Visible } = useRevealOnScroll({
    once: true,
    threshold: 0.1,
  });

  const handleCardClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedMember(null), 200);
  };

  return (
    <section className="bg-[hsl(0,0%,18%)] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-foreground-dark mb-12 text-center text-4xl font-bold">
          Meet Our Team
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {}
          <div
            ref={row1Ref}
            data-index={0}
            className={`transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] ${
              isRow1Visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
          >
            <Card
              className="group cursor-pointer overflow-hidden border-none bg-light-background shadow-medium transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-strong"
              onClick={() => handleCardClick(teamMembers[0]!)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={teamMembers[0]!.image}
                  alt={teamMembers[0]!.name}
                  className="h-80 w-full object-cover transition-transform duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-foreground-primary">
                    <h3 className="mb-2 text-xl font-semibold">
                      {teamMembers[0]!.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium">
                      {teamMembers[0]!.position}
                    </p>
                    <p className="text-sm">{teamMembers[0]!.bio}</p>
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <h3 className="font-semibold text-lg text-foreground-light">
                  {teamMembers[0]!.name}
                </h3>
                <p className="text-sm text-muted-foreground-light">
                  {teamMembers[0]!.position}
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            data-index={1}
            className={`transition-all duration-[var(--duration-medium)] delay-100 ease-[var(--ease-smooth)] ${
              isRow1Visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
          >
            <Card
              className="group cursor-pointer overflow-hidden border-none bg-light-background shadow-medium transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-strong"
              onClick={() => handleCardClick(teamMembers[1]!)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={teamMembers[1]!.image}
                  alt={teamMembers[1]!.name}
                  className="h-80 w-full object-cover transition-transform duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-foreground-primary">
                    <h3 className="mb-2 text-xl font-semibold">
                      {teamMembers[1]!.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium">
                      {teamMembers[1]!.position}
                    </p>
                    <p className="text-sm">{teamMembers[1]!.bio}</p>
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <h3 className="font-semibold text-lg text-foreground-light">
                  {teamMembers[1]!.name}
                </h3>
                <p className="text-sm text-muted-foreground-light">
                  {teamMembers[1]!.position}
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            data-index={2}
            className={`transition-all duration-[var(--duration-medium)] delay-200 ease-[var(--ease-smooth)] ${
              isRow1Visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
          >
            <Card
              className="group cursor-pointer overflow-hidden border-none bg-light-background shadow-medium transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-strong"
              onClick={() => handleCardClick(teamMembers[2]!)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={teamMembers[2]!.image}
                  alt={teamMembers[2]!.name}
                  className="h-80 w-full object-cover transition-transform duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-foreground-primary">
                    <h3 className="mb-2 text-xl font-semibold">
                      {teamMembers[2]!.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium">
                      {teamMembers[2]!.position}
                    </p>
                    <p className="text-sm">{teamMembers[2]!.bio}</p>
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <h3 className="font-semibold text-lg text-foreground-light">
                  {teamMembers[2]!.name}
                </h3>
                <p className="text-sm text-muted-foreground-light">
                  {teamMembers[2]!.position}
                </p>
              </CardContent>
            </Card>
          </div>

          {}
          <div
            ref={row2Ref}
            data-index={3}
            className={`transition-all duration-[var(--duration-medium)] ease-[var(--ease-smooth)] ${
              isRow2Visible
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0"
            }`}
          >
            <Card
              className="group cursor-pointer overflow-hidden border-none bg-light-background shadow-medium transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-strong"
              onClick={() => handleCardClick(teamMembers[3]!)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={teamMembers[3]!.image}
                  alt={teamMembers[3]!.name}
                  className="h-80 w-full object-cover transition-transform duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-foreground-primary">
                    <h3 className="mb-2 text-xl font-semibold">
                      {teamMembers[3]!.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium">
                      {teamMembers[3]!.position}
                    </p>
                    <p className="text-sm">{teamMembers[3]!.bio}</p>
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <h3 className="font-semibold text-lg text-foreground-light">
                  {teamMembers[3]!.name}
                </h3>
                <p className="text-sm text-muted-foreground-light">
                  {teamMembers[3]!.position}
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            data-index={4}
            className={`transition-all duration-[var(--duration-medium)] delay-100 ease-[var(--ease-smooth)] ${
              isRow2Visible
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0"
            }`}
          >
            <Card
              className="group cursor-pointer overflow-hidden border-none bg-light-background shadow-medium transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-strong"
              onClick={() => handleCardClick(teamMembers[4]!)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={teamMembers[4]!.image}
                  alt={teamMembers[4]!.name}
                  className="h-80 w-full object-cover transition-transform duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-foreground-primary">
                    <h3 className="mb-2 text-xl font-semibold">
                      {teamMembers[4]!.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium">
                      {teamMembers[4]!.position}
                    </p>
                    <p className="text-sm">{teamMembers[4]!.bio}</p>
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <h3 className="font-semibold text-lg text-foreground-light">
                  {teamMembers[4]!.name}
                </h3>
                <p className="text-sm text-muted-foreground-light">
                  {teamMembers[4]!.position}
                </p>
              </CardContent>
            </Card>
          </div>

          <div
            data-index={5}
            className={`transition-all duration-[var(--duration-medium)] delay-200 ease-[var(--ease-smooth)] ${
              isRow2Visible
                ? "translate-x-0 opacity-100"
                : "translate-x-16 opacity-0"
            }`}
          >
            <Card
              className="group cursor-pointer overflow-hidden border-none bg-light-background shadow-medium transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-back)] hover:-translate-y-1 hover:shadow-strong"
              onClick={() => handleCardClick(teamMembers[5]!)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={teamMembers[5]!.image}
                  alt={teamMembers[5]!.name}
                  className="h-80 w-full object-cover transition-transform duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/60 opacity-0 backdrop-blur-sm transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-smooth)] group-hover:opacity-100">
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center text-foreground-primary">
                    <h3 className="mb-2 text-xl font-semibold">
                      {teamMembers[5]!.name}
                    </h3>
                    <p className="mb-3 text-sm font-medium">
                      {teamMembers[5]!.position}
                    </p>
                    <p className="text-sm">{teamMembers[5]!.bio}</p>
                  </div>
                </div>
              </div>
              <CardContent className="py-4">
                <h3 className="font-semibold text-lg text-foreground-light">
                  {teamMembers[5]!.name}
                </h3>
                <p className="text-sm text-muted-foreground-light">
                  {teamMembers[5]!.position}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="max-w-2xl bg-light-background shadow-strong">
          {selectedMember && (
            <>
              <DialogHeader>
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="h-64 w-full object-cover"
                  />
                </div>
                <DialogTitle className="text-2xl text-foreground-light">
                  {selectedMember.name}
                </DialogTitle>
                <DialogDescription className="text-base font-medium text-primary">
                  {selectedMember.position}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <p className="text-foreground-light leading-relaxed">
                  {selectedMember.expandedBio}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}