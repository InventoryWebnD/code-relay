"use client";

import { useState } from "react";
import Link from "next/link";
import TracksSection from "@/components/TracksSection";
import { useRegisterModal } from "@/context/RegisterModalContext";

export default function EventPage() {
  const { openRegisterModal } = useRegisterModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scheduleDays = [
    {
      day: "Day 01: Kickoff & Track Briefing",
      date: "FRIDAY (PROVISIONAL)",
      events: [
        { time: "16:00 - 17:30", title: "Registration & Check-In", desc: "Participant badging, mentor room setup, and technical environment checks." },
        { time: "17:30 - 19:00", title: "Opening Ceremony & Keynote", desc: "Welcome address by WebnD IIT Bhubaneswar and industry track sponsors." },
        { time: "19:00 - 19:45", title: "Problem Statement Reveal", desc: "Unveiling challenge repositories, evaluation metrics, and test datasets." },
        { time: "20:00", title: "Hacking Marathon Begins (T=0)", desc: "Relay Sprint 1 officially kicks off. Teams commence ideation and architecture." },
      ],
    },
    {
      day: "Day 02: Relay Sprints & Mentor Review",
      date: "SATURDAY (PROVISIONAL)",
      events: [
        { time: "02:00 - 04:00", title: "Midnight Architecture Review", desc: "Technical checkpoint with mentors to debug blockers and review schemas." },
        { time: "09:00 - 12:00", title: "Relay Handoff & Sprint 2", desc: "Core implementation sprint: API integration, smart contract deployments." },
        { time: "15:00 - 18:00", title: "Mentorship Office Hours", desc: "1-on-1 feedback sessions with domain leads from Web2 and Web3 sponsor teams." },
        { time: "22:00", title: "Pre-Submission Health Check", desc: "Verify test runner compliance, deployment pipelines, and environment configs." },
      ],
    },
    {
      day: "Day 03: Code Freeze & Demo Day",
      date: "SUNDAY (PROVISIONAL)",
      events: [
        { time: "08:00", title: "CODE FREEZE (T=36 Hours)", desc: "Strict repository commit lock. Submissions closed on portal with video demos." },
        { time: "09:30 - 13:00", title: "Preliminary Jury Evaluations", desc: "Code review, test suite execution, and shortlisting of top finalist teams." },
        { time: "14:30 - 17:00", title: "Grand Finalist Pitches & Live Demos", desc: "Top 12 teams pitch live on stage and stream before our distinguished jury." },
        { time: "17:30 - 18:30", title: "Valedictory & Prize Distribution", desc: "Announcement of track winners, bounty distributions, and closing remarks." },
      ],
    },
  ];

  const judgingCriteria = [
    {
      weight: "30%",
      title: "Technical Depth & Complexity",
      desc: "Robustness of system architecture, concurrency handling, smart contract security, gas optimization, or distributed data flow.",
    },
    {
      weight: "25%",
      title: "Innovation & Problem Solving",
      desc: "Novelty of the solution, distinct architectural choices, and practical value applied to the problem statement.",
    },
    {
      weight: "25%",
      title: "Implementation & Working Demo",
      desc: "Completeness of the codebase, passing unit/integration tests, operational live deployment, and realistic reliability under load.",
    },
    {
      weight: "20%",
      title: "UI/UX & Presentation",
      desc: "Intuitive user interface, coherent interaction design, accessibility, and the team's ability to clearly articulate their solution.",
    },
  ];

  const faqs = [
    {
      q: "Who is eligible to participate in Code Relay 5.0?",
      a: "Any undergraduate or postgraduate student currently enrolled in a recognized university or institute in India is eligible. Teams may consist of 2 to 4 members. Inter-college and inter-branch teams are fully permitted.",
    },
    {
      q: "Is there any registration or entry fee?",
      a: "No! Code Relay is 100% free for all participants. The Web and Design Society (WebnD) and our partners provide full event access, mentorship, and platform resources at no cost.",
    },
    {
      q: "What is the hybrid format and venue location?",
      a: "Participants have the option to attend on-campus at the IIT Bhubaneswar permanent campus (Argul, Jatni) or compete virtually through our verified online relay rooms with live Discord/video support.",
    },
    {
      q: "Can I participate in both Web2 and Web3 tracks?",
      a: "Each team selects one primary track (either Web2 or Web3) when submitting their final project. However, solutions that bridge Web2 frontends with Web3 backend protocols are strongly encouraged and eligible for cross-category bounties.",
    },
    {
      q: "What are the rules regarding pre-existing code?",
      a: "All code submitted for judging must be written during the 36-hour hackathon duration. You may utilize public open-source libraries, packages, frameworks, and APIs, but the core project logic, contracts, and interfaces must be original work created during the event.",
    },
    {
      q: "When will the official problem statements be released?",
      a: "Official Code Relay 5.0 problem statements will be revealed during the Opening Ceremony on Day 1. In the meantime, you can explore the archive of past edition problem statements on our Past Problem Statements page.",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F6F0E8] text-[#1E030A]">
      {/* 1. Page Header */}
      <section className="relative w-full pt-12 pb-16 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-start max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-1.5 shadow-hard-xs mb-4">
              <span className="text-xs font-mono font-bold text-[#620821] uppercase tracking-wider">
                Edition 5.0 Specifications · IIT Bhubaneswar
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#620821] mb-6">
              THE EVENT: CODE RELAY 5.0
            </h1>

            <p className="text-lg sm:text-xl text-[#3A1822] font-medium leading-relaxed mb-8">
              Code Relay 5.0 is the flagship 36-hour hackathon of the Web and Design Society (WebnD) at IIT Bhubaneswar. Uniting student developers nationwide, Code Relay challenges participants to build, ship, and pitch production-ready solutions across dual Web2 and Web3 verticals.
            </p>

            {/* Quick in-page nav pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { label: "Tracks", href: "#tracks" },
                { label: "Format & Eligibility", href: "#format" },
                { label: "Provisional Schedule", href: "#schedule" },
                { label: "Prizes", href: "#prizes" },
                { label: "Judging Criteria", href: "#judging" },
                { label: "FAQs", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3 py-1.5 text-xs font-mono font-bold text-[#620821] shadow-hard-xs hover:bg-[#991B3D] hover:text-white transition-all"
                >
                  {item.label} ↓
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. Track Descriptions */}
      <TracksSection />

      {/* 3. Confirmed Participation Format & Eligibility */}
      <section id="format" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-start mb-12">
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                Event Rules &amp; Specifications
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
              PARTICIPATION FORMAT &amp; ELIGIBILITY
            </h2>
            <p className="mt-2 text-base text-[#48232C] max-w-3xl font-medium">
              Everything you need to know about team structure, collegiate requirements, and the relay execution format.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="card-25d rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D4C3] mb-4">
                  <span className="font-mono text-xs font-bold text-[#991B3D]">Spec 01</span>
                  <span className="rounded border border-[#160207] bg-[#991B3D] px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-hard-xs">
                    TEAM DYNAMICS
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#620821] mb-2">
                  2–4 Hackers Per Team
                </h3>
                <p className="text-sm text-[#48232C] leading-relaxed">
                  Compete in collaborative cells of 2 to 4 members. Inter-college, inter-branch, and inter-year teams are fully permitted and welcomed.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E0D4C3] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6D4B54]">Confirmed</span>
              </div>
            </div>

            <div className="card-25d rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D4C3] mb-4">
                  <span className="font-mono text-xs font-bold text-[#4B5D86]">Spec 02</span>
                  <span className="rounded border border-[#160207] bg-[#4B5D86] px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-hard-xs">
                    STUDENT STATUS
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#620821] mb-2">
                  All Indian Colleges
                </h3>
                <p className="text-sm text-[#48232C] leading-relaxed">
                  Open to all active undergraduate (B.Tech, B.Sc, BCA, etc.) and postgraduate (M.Tech, MCA, etc.) students with a valid college ID card.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E0D4C3] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6D4B54]">Confirmed</span>
              </div>
            </div>

            <div className="card-25d rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D4C3] mb-4">
                  <span className="font-mono text-xs font-bold text-[#620821]">Spec 03</span>
                  <span className="rounded border border-[#160207] bg-[#620821] px-2 py-0.5 text-[10px] font-black uppercase text-white shadow-hard-xs">
                    36H MARATHON
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#620821] mb-2">
                  Continuous Relay Sprint
                </h3>
                <p className="text-sm text-[#48232C] leading-relaxed">
                  36 uninterrupted hours of architecture, development, and debugging with milestone checkpoints and mentorship touchpoints.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E0D4C3] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6D4B54]">Confirmed</span>
              </div>
            </div>

            <div className="card-25d rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D4C3] mb-4">
                  <span className="font-mono text-xs font-bold text-[#380412]">Spec 04</span>
                  <span className="rounded border border-[#160207] bg-[#EADBCC] px-2 py-0.5 text-[10px] font-black uppercase text-[#380412] shadow-hard-xs">
                    HYBRID VENUE
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-[#620821] mb-2">
                  Campus &amp; Virtual Rooms
                </h3>
                <p className="text-sm text-[#48232C] leading-relaxed">
                  Hacking takes place on the scenic IIT Bhubaneswar campus with real-time synchronized virtual relay rooms for remote teams.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E0D4C3] mt-4 flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#6D4B54]">Confirmed</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Tentative Schedule (Clearly Labelled as Provisional) */}
      <section id="schedule" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
                <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                  Timeline Runbook
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
                TENTATIVE SCHEDULE
              </h2>
            </div>

            {/* Provisional Notice Pill */}
            <div className="rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-4 py-2 shadow-hard-xs flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold text-[#620821] uppercase tracking-wider">
                Provisional Schedule · Subject to Final Confirmation
              </span>
            </div>
          </div>

          {/* Schedule Days Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {scheduleDays.map((dayGroup) => (
              <div
                key={dayGroup.day}
                className="rounded-2xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-lg flex flex-col justify-between"
              >
                <div>
                  <div className="pb-4 border-b-2 border-[#160207] mb-6">
                    <span className="block font-mono text-[11px] font-bold text-[#991B3D] uppercase tracking-wider mb-1">
                      {dayGroup.date}
                    </span>
                    <h3 className="font-heading text-xl font-black uppercase text-[#620821]">
                      {dayGroup.day}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {dayGroup.events.map((event, idx) => (
                      <div key={idx} className="relative pl-6 border-l-2 border-[#E0D4C3]">
                        <span className="block font-mono text-xs font-bold text-[#991B3D] mb-1">
                          {event.time}
                        </span>
                        <h4 className="font-heading text-base font-bold text-[#1E030A] mb-1">
                          {event.title}
                        </h4>
                        <p className="text-xs text-[#48232C] leading-relaxed">
                          {event.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#E0D4C3] mt-6 flex items-center justify-between text-[11px] font-mono text-[#6D4B54]">
                  <span>Provisional Schedule</span>
                  <span>Timezone: IST (UTC+5:30)</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Prizes & Grants Pool */}
      <section id="prizes" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#620821] text-white">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#380412] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                Rewards &amp; Bounties
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white">
              ₹2,50,000+ PRIZE POOL &amp; GRANTS
            </h2>
            <p className="mt-2 text-base text-[#F6F0E8]/90 max-w-2xl font-normal">
              Competitive cash awards, track bounties, cloud infrastructure credits, and recruitment opportunities with partner organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Web2 Winner */}
            <div className="card-25d rounded-xl border-2 border-[#160207] bg-[#380412] p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-[#160207] bg-[#991B3D] px-3 py-1 text-xs font-heading font-black uppercase text-white shadow-hard-xs mb-4">
                  WEB2 TRACK WINNER
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-black text-white mb-2">
                  ₹75,000
                </div>
                <span className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase tracking-wider mb-4">
                  + CLOUD &amp; API CREDITS
                </span>
                <p className="text-sm text-[#F6F0E8]/90 leading-relaxed">
                  Awarded to the most innovative, scalable, and production-ready distributed system or intelligent web application in the Web2 track.
                </p>
              </div>
              <div className="pt-4 border-t border-[#160207] mt-6 text-xs font-mono text-[#D8CCD0]">
                INCLUDES IIT BBS MEMENTO &amp; CERTIFICATE
              </div>
            </div>

            {/* Web3 Winner */}
            <div className="card-25d rounded-xl border-2 border-[#160207] bg-[#2A344A] p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-[#160207] bg-[#4B5D86] px-3 py-1 text-xs font-heading font-black uppercase text-white shadow-hard-xs mb-4">
                  WEB3 TRACK WINNER
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-black text-white mb-2">
                  ₹75,000
                </div>
                <span className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase tracking-wider mb-4">
                  + PROTOCOL GRANTS &amp; AUDITS
                </span>
                <p className="text-sm text-[#F6F0E8]/90 leading-relaxed">
                  Awarded to the top decentralized protocol, zero-knowledge application, or smart account infrastructure project in the Web3 track.
                </p>
              </div>
              <div className="pt-4 border-t border-[#160207] mt-6 text-xs font-mono text-[#D8CCD0]">
                INCLUDES IIT BBS MEMENTO &amp; CERTIFICATE
              </div>
            </div>

            {/* Runner Ups & Category Bounties */}
            <div className="card-25d rounded-xl border-2 border-[#160207] bg-[#22020A] p-6 sm:p-8 shadow-hard-lg flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-md border border-[#160207] bg-[#F6F0E8] px-3 py-1 text-xs font-heading font-black uppercase text-[#620821] shadow-hard-xs mb-4">
                  BOUNTIES &amp; RUNNERS-UP
                </div>
                <div className="font-heading text-4xl sm:text-5xl font-black text-white mb-2">
                  ₹1,00,000+
                </div>
                <span className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase tracking-wider mb-4">
                  ACROSS VERTICAL POOLS
                </span>
                <p className="text-sm text-[#F6F0E8]/90 leading-relaxed">
                  Track 1 &amp; 2 Runner-Ups (₹35,000 each) plus dedicated bounties for Best UI/UX Design, Best Beginner Team, and Partner Tool Integrations.
                </p>
              </div>
              <div className="pt-4 border-t border-[#160207] mt-6 text-xs font-mono text-[#D8CCD0]">
                ALL FINALISTS RECEIVE SWAG KITS
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Rules & Judging Criteria */}
      <section id="judging" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 6 cols: Judging Criteria */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3 w-fit">
                <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                  Evaluation Rubric
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#620821] mb-4">
                JUDGING CRITERIA
              </h2>
              <p className="text-sm text-[#48232C] leading-relaxed mb-6 font-normal">
                All projects are independently evaluated by a panel of industry senior engineers, founders, and IIT faculty mentors according to standardized metrics.
              </p>

              <div className="space-y-4">
                {judgingCriteria.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-5 shadow-hard-sm flex items-start gap-4"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#991B3D] text-white shadow-hard-xs font-mono font-black text-sm">
                      {item.weight}
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-[#620821] mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#48232C] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 cols: General Rules & Guidelines */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3 w-fit">
                <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                  Hackathon Protocol
                </span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#620821] mb-4">
                RULES &amp; CODE OF CONDUCT
              </h2>
              <p className="text-sm text-[#48232C] leading-relaxed mb-6 font-normal">
                Code Relay is dedicated to fair competition, high technical integrity, and an inclusive hacking environment for all builders.
              </p>

              <div className="rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-6 shadow-hard-lg space-y-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#160207] bg-[#991B3D] text-white font-mono text-xs font-bold">
                    01
                  </span>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#620821]">Original Code Requirement</h4>
                    <p className="text-xs text-[#48232C] mt-0.5">
                      All core application code and logic must be written between the opening whistle and code freeze. Plagiarism or pre-built complete solutions will lead to immediate disqualification.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#160207] bg-[#4B5D86] text-white font-mono text-xs font-bold">
                    02
                  </span>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#620821]">Open Source Repositories</h4>
                    <p className="text-xs text-[#48232C] mt-0.5">
                      Submissions must be hosted on a public GitHub/GitLab repository with a descriptive README, architecture diagram, deployment instructions, and an open-source license.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#160207] bg-[#620821] text-white font-mono text-xs font-bold">
                    03
                  </span>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#620821]">Live Working Deployments</h4>
                    <p className="text-xs text-[#48232C] mt-0.5">
                      Every final submission must feature an accessible live URL (e.g. Vercel, Railway, testnet contract address) and a brief 2-minute video walkthrough.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#160207] bg-[#EADBCC] text-[#380412] font-mono text-xs font-bold">
                    04
                  </span>
                  <div>
                    <h4 className="font-heading text-sm font-bold text-[#620821]">Inclusive &amp; Respectful Culture</h4>
                    <p className="text-xs text-[#48232C] mt-0.5">
                      Harassment, discrimination, or abusive behavior of any form will not be tolerated. We adhere strictly to the WebnD IIT Bhubaneswar Code of Conduct.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. Frequently Asked Questions (FAQ) */}
      <section id="faq" className="relative w-full py-16 sm:py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#620821] px-3 py-1 shadow-hard-xs mb-3">
              <span className="font-mono text-xs font-bold text-[#F6F0E8] uppercase tracking-wider">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#620821]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="mt-2 text-base text-[#48232C] max-w-2xl font-medium">
              Have questions regarding admissions, travel, equipment, or problem statements? Check answers below.
            </p>
          </div>

          <div className="space-y-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border-2 border-[#160207] bg-[#FFFDF9] shadow-hard-sm overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-heading text-base sm:text-lg font-bold text-[#620821] hover:text-[#991B3D] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#160207] bg-[#EADBCC] font-mono text-sm text-[#620821] shadow-hard-xs">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-[#48232C] leading-relaxed border-t border-[#E0D4C3]">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 8. Prominent Registration CTA */}
      <section className="relative w-full py-20 border-b-2 border-[#160207] bg-[#F6F0E8]">
        <div className="w-full px-6 sm:px-10 lg:px-12">
          <div className="relative rounded-2xl border-3 border-[#160207] bg-[#620821] p-8 sm:p-12 shadow-hard-xl text-center text-white">
            
            <div className="inline-flex items-center gap-2 rounded-md border-2 border-[#160207] bg-[#991B3D] px-3.5 py-1.5 shadow-hard-xs mb-4">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                PORTAL IS OPENING SOON
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white mb-4">
              JOIN CODE RELAY 5.0
            </h2>

            <p className="text-base sm:text-lg text-[#F6F0E8]/90 max-w-2xl mx-auto leading-relaxed mb-8">
              Early priority registration gives your team immediate notifications when challenge briefs, mentor pairing, and physical venue passes go live.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={openRegisterModal}
                className="btn-pressable-hero w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-9 py-4 text-base font-heading font-black uppercase tracking-wider text-white shadow-hard-md"
              >
                <span>Register Now for Free</span>
                <span className="text-[#F6F0E8]">→</span>
              </button>

              <Link
                href="/problem-statements"
                className="btn-pressable w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#160207] bg-[#F6F0E8] hover:bg-white px-7 py-4 text-base font-heading font-bold text-[#620821] shadow-hard"
              >
                <span>Browse Past Problem Statements</span>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
