"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const STUDY_YEARS = [
  "1st Year (UG)",
  "2nd Year (UG)",
  "3rd Year (UG)",
  "4th Year (UG)",
  "5th Year / Dual Degree",
  "Postgraduate (M.Tech / MS / PhD)",
  "Other",
];

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [studyYear, setStudyYear] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    name: string;
    email: string;
    institution: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validations matching registerSchema
    if (name.trim().length < 2) {
      setErrorMessage("Full name must be at least 2 characters long.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    if (institution.trim().length < 2) {
      setErrorMessage("Please provide your college, institute, or university name.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        institution: institution.trim(),
        department: department.trim() || undefined,
        studyYear: studyYear || undefined,
      };

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(
          data?.error ||
          (data?.details?.formErrors?.length ? data.details.formErrors[0] : "Registration failed. Please check your inputs.")
        );
        setIsLoading(false);
        return;
      }

      setSuccessData({
        name: data?.user?.name || name,
        email: data?.user?.email || email,
        institution: data?.user?.institution || institution,
      });

      // Automatically sign in the newly registered participant
      try {
        await signIn("credentials", {
          email: payload.email,
          password: payload.password,
          redirect: false,
        });
      } catch (authErr) {
        console.error("Auto sign-in error after registration:", authErr);
      }
    } catch (err) {
      console.error("Registration request error:", err);
      setErrorMessage("Network error occurred while connecting to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">

        {/* Left Column: Event Context & Admission Milestones (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
          {/* Event Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#B82A4F]/60 bg-[#24040d]/80 px-3.5 py-1 mb-5 shadow-[0_0_15px_rgba(153,27,61,0.3)]">
            <div className="relative w-4 h-4 shrink-0 rounded overflow-hidden">
              <Image
                src="/assets/cr_logo.png"
                alt="Code Relay Logo"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-mono text-xs font-bold text-[#FFA3B9] uppercase tracking-wider">
              EDITION 5.0 · HACKER PORTAL
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E8] mb-4 leading-tight">
            REGISTER FOR<br />
            CODE RELAY 5.0
          </h1>

          <p className="text-base sm:text-lg text-[#E0D4C3] font-normal leading-relaxed mb-8">
            Create your verified participant profile to submit technical architecture decks, assemble multi-member relay squads, and compete in the nationwide sprint.
          </p>

          {/* Key Highlights Card */}
          <div className="w-full editorial-card rounded-2xl p-6 border border-[rgba(255,255,255,0.08)] bg-[#24040d]/60 mb-8 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#991B3D]/50 border border-[#FFA3B9]/30 text-white font-mono text-xs font-bold">
                01
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-[#F6F0E8]">
                  Dual Track Architecture
                </h4>
                <p className="text-xs text-[#D6C6CC] mt-0.5 leading-relaxed">
                  Compete across Web2 (distributed backends, AI agents) or Web3 (smart contracts, ZK protocols).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#991B3D]/50 border border-[#FFA3B9]/30 text-white font-mono text-xs font-bold">
                02
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-[#F6F0E8]">
                  2–4 Hackers / Team
                </h4>
                <p className="text-xs text-[#D6C6CC] mt-0.5 leading-relaxed">
                  Once registered, you can create a team or join teammates using a private invite code.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 pt-3 border-t border-[rgba(255,255,255,0.06)]">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#991B3D]/50 border border-[#FFA3B9]/30 text-white font-mono text-xs font-bold">
                03
              </div>
              <div>
                <h4 className="font-heading text-sm font-bold uppercase text-[#F6F0E8]">
                  Round 1 &amp; Offline Finale
                </h4>
                <p className="text-xs text-[#D6C6CC] mt-0.5 leading-relaxed">
                  Online deck submissions until Dec 12, followed by the on-campus 36-hour sprint at IIT Bhubaneswar (Jan 15–17).
                </p>
              </div>
            </div>
          </div>

          {/* Decorative 3D Vignette */}
          <div className="hidden lg:flex items-center gap-4 pt-2">
            <div className="relative w-16 h-16 shrink-0 rounded-2xl border border-[rgba(255,255,255,0.1)] bg-[#24040d]/80 p-2 shadow-md">
              <Image
                src="/decoratives/trophy.webp"
                alt="Code Relay Trophy"
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-[#FFA3B9] block">
                IIT Bhubaneswar Campus
              </span>
              <span className="text-xs text-[#E0D4C3]/70">
                Host Institution &amp; Grand Offline Arena
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Registration Form (7 cols) */}
        <div className="lg:col-span-7 w-full">
          <div className="editorial-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-[rgba(255,255,255,0.1)] bg-[#1a0309]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
            {/* Top specular glow highlight */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFA3B9]/60 to-transparent" />

            {successData ? (
              /* Success Confirmation Screen */
              <div className="py-8 text-center space-y-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#FFA3B9] bg-gradient-to-br from-[#991B3D] to-[#620821] text-white shadow-[0_0_30px_rgba(232,115,141,0.6)] animate-in zoom-in-75 duration-300">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div>
                  <span className="rounded-full border border-[#B82A4F]/60 bg-[#991B3D]/30 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#FFA3B9] inline-block mb-3">
                    Account Verified
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F6F0E8] mb-2">
                    Welcome to Code Relay 5.0!
                  </h2>
                  <p className="text-sm sm:text-base text-[#E0D4C3] max-w-md mx-auto leading-relaxed font-normal">
                    Your participant account has been successfully initialized for <strong className="text-white">{successData.name}</strong>.
                  </p>
                </div>

                {/* Participant Summary Box */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-white/5 p-5 text-left max-w-md mx-auto space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between items-center text-[#E0D4C3]">
                    <span className="text-[#FFA3B9]">Email:</span>
                    <span className="font-bold text-white">{successData.email}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#E0D4C3] pt-2 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="text-[#FFA3B9]">Institution:</span>
                    <span className="font-bold text-white truncate max-w-[220px]">{successData.institution}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#E0D4C3] pt-2 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="text-[#FFA3B9]">Status:</span>
                    <span className="text-[#10B981] font-bold">PROFILE ACTIVE</span>
                  </div>
                </div>

                {/* Next Steps CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
                  <Link
                    href="/profile"
                    className="btn-pill-primary w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-center"
                  >
                    <span>Go to My Profile</span>
                    <span>→</span>
                  </Link>

                  <Link
                    href="/event#timeline"
                    className="btn-pill-secondary w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-center"
                  >
                    <span>Check Timeline</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ) : (
              /* Registration Form */
              <div>
                {/* Form Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[rgba(255,255,255,0.08)]">
                  <div>
                    <span className="font-mono text-xs font-bold text-[#FFA3B9] uppercase tracking-wider block mb-1">
                      Admission Form · User Schema
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F6F0E8]">
                      Participant Profile
                    </h2>
                  </div>
                  <span className="rounded-full border border-[rgba(255,255,255,0.12)] bg-white/5 px-3 py-1 font-mono text-[11px] font-bold text-[#E0D4C3]">
                    Step 01 / 02
                  </span>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="rounded-2xl border border-red-500/50 bg-red-950/40 p-4 mb-6 flex items-start gap-3 text-sm text-red-200">
                    <span className="text-red-400 font-bold shrink-0 text-base">✕</span>
                    <span className="leading-relaxed">{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Section 1: Basic Information */}
                  <div className="space-y-4">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFA3B9]">
                      1. Personal Identity &amp; Login
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                          Full Name <span className="text-[#FFA3B9]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          minLength={2}
                          maxLength={80}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Sharma"
                          className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 transition-all font-sans"
                        />
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                          Email Address <span className="text-[#FFA3B9]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@iitbbs.ac.in"
                          className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 transition-all font-sans"
                        />
                      </div>
                    </div>

                    {/* Password & Confirm Password */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                          Password <span className="text-[#FFA3B9]">*</span>
                          <span className="font-normal text-[10px] text-[#E0D4C3]/60 ml-1.5 lowercase">
                            (min 8 chars)
                          </span>
                        </label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          maxLength={72}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 transition-all font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                          Confirm Password <span className="text-[#FFA3B9]">*</span>
                        </label>
                        <input
                          type="password"
                          required
                          minLength={8}
                          maxLength={72}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Academic & Institutional Information */}
                  <div className="space-y-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFA3B9]">
                      2. Institutional Background
                    </h3>

                    {/* Institution Name */}
                    <div>
                      <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                        College / Institute / University <span className="text-[#FFA3B9]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={160}
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        placeholder="e.g. Indian Institute of Technology Bhubaneswar"
                        className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 transition-all font-sans"
                      />
                    </div>

                    {/* Department & Study Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                          Department / Branch
                          <span className="font-normal text-[10px] text-[#E0D4C3]/60 ml-1.5 lowercase">
                            (optional)
                          </span>
                        </label>
                        <input
                          type="text"
                          maxLength={120}
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          placeholder="e.g. Computer Science & Engg."
                          className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 transition-all font-sans"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                          Year of Study
                          <span className="font-normal text-[10px] text-[#E0D4C3]/60 ml-1.5 lowercase">
                            (optional)
                          </span>
                        </label>
                        <select
                          value={studyYear}
                          onChange={(e) => setStudyYear(e.target.value)}
                          className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 transition-all font-sans"
                        >
                          <option value="" className="bg-[#160207] text-[#E0D4C3]">
                            Select year of study...
                          </option>
                          {STUDY_YEARS.map((yr) => (
                            <option key={yr} value={yr} className="bg-[#160207] text-[#F6F0E8]">
                              {yr}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-pill-primary w-full py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>INITIALIZING PARTICIPANT PROFILE...</span>
                        </>
                      ) : (
                        <>
                          <span>COMPLETE REGISTRATION</span>
                          <span className="text-sm">→</span>
                        </>
                      )}
                    </button>

                    <p className="text-center font-mono text-[11px] text-[#E0D4C3]/60 mt-4">
                      By registering, you agree to Code Relay 5.0 hackathon rules &amp; IIT Bhubaneswar conduct policies.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
