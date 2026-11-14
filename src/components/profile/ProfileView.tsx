"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  phone: string | null;
  institution: string | null;
  department: string | null;
  studyYear: string | null;
  bio: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  createdAt: string;
}

const STUDY_YEARS = [
  "1st Year (UG)",
  "2nd Year (UG)",
  "3rd Year (UG)",
  "4th Year (UG)",
  "5th Year / Dual Degree",
  "Postgraduate (M.Tech / MS / PhD)",
  "Other",
];

export default function ProfileView() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Edit form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [department, setDepartment] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [bio, setBio] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  const populateForm = useCallback((data: UserProfile) => {
    setName(data.name || "");
    setPhone(data.phone || "");
    setInstitution(data.institution || "");
    setDepartment(data.department || "");
    setStudyYear(data.studyYear || "");
    setBio(data.bio || "");
    setGithubUrl(data.githubUrl || "");
    setLinkedinUrl(data.linkedinUrl || "");
    setWebsiteUrl(data.websiteUrl || "");
  }, []);

  useEffect(() => {
    let ignore = false;

    if (status === "authenticated") {
      fetch("/api/profile")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!ignore && data?.profile) {
            setProfile(data.profile);
            populateForm(data.profile);
          }
        })
        .catch((err) => {
          console.error("Failed to load profile:", err);
        });
    }

    return () => {
      ignore = true;
    };
  }, [status, populateForm]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const payload = {
        name: name.trim() || undefined,
        phone: phone.trim() || null,
        institution: institution.trim() || null,
        department: department.trim() || null,
        studyYear: studyYear || null,
        bio: bio.trim() || null,
        githubUrl: githubUrl.trim() || null,
        linkedinUrl: linkedinUrl.trim() || null,
        websiteUrl: websiteUrl.trim() || null,
      };

      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Failed to update profile.");
        setSaveLoading(false);
        return;
      }

      setProfile(data.profile);
      populateForm(data.profile);
      setIsEditing(false);
      setSuccessMsg("Profile details saved successfully!");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      console.error("Profile update error:", err);
      setErrorMsg("Network error updating profile. Please try again.");
    } finally {
      setSaveLoading(false);
    }
  };

  const isLoading = status === "loading" || (status === "authenticated" && !profile);

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center py-20 text-[#E0D4C3]">
        <div className="h-10 w-10 border-2 border-[#FFA3B9] border-t-transparent rounded-full animate-spin mb-4" />
        <span className="font-mono text-xs uppercase tracking-wider text-[#FFA3B9]">
          Loading Hacker Profile...
        </span>
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="w-full min-h-[65vh] flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="editorial-card rounded-3xl p-8 sm:p-12 max-w-lg w-full border border-[rgba(255,255,255,0.1)] bg-[#1a0309]/90 shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
          <div className="h-16 w-16 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-[#991B3D]/30 border border-[#FFA3B9]/40 text-white shadow-[0_0_20px_rgba(153,27,61,0.5)]">
            <svg className="w-8 h-8 text-[#FFA3B9]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFA3B9] block mb-2">
            Session Not Found
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F6F0E8] mb-3">
            Authentication Required
          </h2>
          <p className="text-sm text-[#E0D4C3] leading-relaxed mb-8 font-normal">
            Please log in with your credentials or register a new participant account to view and manage your Code Relay 5.0 profile.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/login"
              className="btn-pill-primary w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-center"
            >
              <span>Sign In</span>
              <span>→</span>
            </Link>
            <Link
              href="/register"
              className="btn-pill-secondary w-full sm:w-auto px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-center"
            >
              <span>Register Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const initials = (profile?.name || session.user?.name || "CR")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="w-full space-y-8">
      {/* Toast Alert Messages */}
      {successMsg && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-4 flex items-center justify-between text-sm text-emerald-200 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">✓</span>
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-xs text-emerald-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="rounded-2xl border border-red-500/50 bg-red-950/40 p-4 flex items-center justify-between text-sm text-red-200 shadow-lg">
          <div className="flex items-center gap-3">
            <span className="text-red-400 font-bold">✕</span>
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-xs text-red-400 hover:underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Overview Billboard */}
      <div className="editorial-card rounded-3xl p-6 sm:p-10 border border-[rgba(255,255,255,0.1)] bg-[#1a0309]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFA3B9]/60 to-transparent" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-5">
            {/* User Avatar Circle */}
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-[#FFA3B9] bg-gradient-to-br from-[#991B3D] via-[#620821] to-[#22020A] text-white shadow-[0_0_25px_rgba(232,115,141,0.5)]">
              {profile?.image ? (
                <Image
                  src={profile.image}
                  alt={profile.name || "Avatar"}
                  fill
                  className="rounded-2xl object-cover"
                />
              ) : (
                <span className="font-heading text-2xl font-black tracking-wider text-white">
                  {initials}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2.5 mb-1">
                <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F6F0E8]">
                  {profile?.name || session.user?.name || "Participant"}
                </h1>
                <span className="rounded-full border border-[#B82A4F]/60 bg-[#991B3D]/30 px-3 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FFA3B9]">
                  {profile?.role || session.user?.role || "PARTICIPANT"}
                </span>
              </div>
              <span className="font-mono text-xs text-[#E0D4C3]/80">
                {profile?.email || session.user?.email}
              </span>
              {profile?.institution && (
                <span className="text-xs text-[#E8738D] font-medium mt-1">
                  {profile.institution}
                  {profile.department ? ` · ${profile.department}` : ""}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-pill-secondary py-2 px-5 text-xs font-bold uppercase tracking-wider"
            >
              <span>{isEditing ? "Cancel Editing" : "Edit Profile"}</span>
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-full border border-red-500/40 bg-red-950/20 px-5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-red-300 hover:bg-red-900/40 hover:text-white transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Profile Content Body: Edit Mode vs View Mode */}
        {isEditing ? (
          <form onSubmit={handleSave} className="pt-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFA3B9]">
                Edit Profile Information
              </h3>
              <span className="text-xs font-mono text-[#E0D4C3]/60">
                Fields will update on server
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Full Name"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                  College / Institute
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="Indian Institute of Technology Bhubaneswar"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                  Year of Study
                </label>
                <select
                  value={studyYear}
                  onChange={(e) => setStudyYear(e.target.value)}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40"
                >
                  <option value="" className="bg-[#160207] text-[#E0D4C3]">
                    Select year...
                  </option>
                  {STUDY_YEARS.map((yr) => (
                    <option key={yr} value={yr} className="bg-[#160207] text-[#F6F0E8]">
                      {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                Department / Branch
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                placeholder="Computer Science & Engineering"
                className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40"
              />
            </div>

            <div>
              <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                Short Bio / Statement
              </label>
              <textarea
                rows={3}
                maxLength={500}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Full-stack builder interested in high-throughput distributed backends and zero-knowledge protocols..."
                className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
                  Personal Portfolio URL
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://yourportfolio.dev"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 font-mono text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              <button
                type="submit"
                disabled={saveLoading}
                className="btn-pill-primary py-2.5 px-7 text-xs font-bold uppercase tracking-wider"
              >
                {saveLoading ? "Saving Changes..." : "Save Profile Details"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (profile) populateForm(profile);
                  setIsEditing(false);
                }}
                className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-mono font-bold uppercase text-[#E0D4C3] hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* View Mode */
          <div className="pt-8 space-y-8">
            {/* Bio */}
            {profile?.bio && (
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFA3B9] block mb-2">
                  About Builder
                </span>
                <p className="text-sm sm:text-base text-[#D6C6CC] leading-relaxed max-w-3xl">
                  {profile.bio}
                </p>
              </div>
            )}

            {/* Profile Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/5 p-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FFA3B9] block mb-1">
                  Institution
                </span>
                <span className="font-heading text-sm sm:text-base font-bold text-[#F6F0E8] block">
                  {profile?.institution || "Not provided"}
                </span>
              </div>

              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/5 p-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FFA3B9] block mb-1">
                  Department &amp; Year
                </span>
                <span className="font-heading text-sm sm:text-base font-bold text-[#F6F0E8] block">
                  {profile?.department || "Branch"} · {profile?.studyYear || "Year"}
                </span>
              </div>

              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-white/5 p-4">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#FFA3B9] block mb-1">
                  Contact Phone
                </span>
                <span className="font-mono text-sm font-bold text-[#F6F0E8] block">
                  {profile?.phone || "Not provided"}
                </span>
              </div>
            </div>

            {/* Socials / Links Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[rgba(255,255,255,0.08)]">
              {profile?.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[rgba(255,255,255,0.12)] bg-white/5 px-4 py-1.5 text-xs font-mono text-[#F6F0E8] hover:border-[#FFA3B9] hover:text-[#FFA3B9] transition-colors"
                >
                  GitHub ↗
                </a>
              )}
              {profile?.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[rgba(255,255,255,0.12)] bg-white/5 px-4 py-1.5 text-xs font-mono text-[#F6F0E8] hover:border-[#FFA3B9] hover:text-[#FFA3B9] transition-colors"
                >
                  LinkedIn ↗
                </a>
              )}
              {profile?.websiteUrl && (
                <a
                  href={profile.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[rgba(255,255,255,0.12)] bg-white/5 px-4 py-1.5 text-xs font-mono text-[#F6F0E8] hover:border-[#FFA3B9] hover:text-[#FFA3B9] transition-colors"
                >
                  Portfolio ↗
                </a>
              )}
              {!profile?.githubUrl && !profile?.linkedinUrl && !profile?.websiteUrl && (
                <span className="text-xs font-mono text-[#E0D4C3]/60">
                  No public portfolio links configured yet. Click &quot;Edit Profile&quot; to add them.
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/event#timeline"
          className="editorial-card group rounded-3xl p-6 sm:p-8 border border-[rgba(255,255,255,0.08)] bg-[#24040d]/60 hover:border-[#FFA3B9]/50 transition-all"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFA3B9] block mb-2">
            Hackathon Deadlines
          </span>
          <h3 className="font-heading text-xl font-bold uppercase text-[#F6F0E8] group-hover:text-white mb-2">
            Review Timeline &amp; Submissions →
          </h3>
          <p className="text-xs sm:text-sm text-[#D6C6CC] leading-relaxed">
            Idea deck submission deadline is Dec 12. Offline grand finale sprint at IIT Bhubaneswar on Jan 15–17.
          </p>
        </Link>

        <Link
          href="/problem-statements"
          className="editorial-card group rounded-3xl p-6 sm:p-8 border border-[rgba(255,255,255,0.08)] bg-[#24040d]/60 hover:border-[#FFA3B9]/50 transition-all"
        >
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#FFA3B9] block mb-2">
            Track Specifications
          </span>
          <h3 className="font-heading text-xl font-bold uppercase text-[#F6F0E8] group-hover:text-white mb-2">
            Explore Problem Statements →
          </h3>
          <p className="text-xs sm:text-sm text-[#D6C6CC] leading-relaxed">
            Browse challenge statements from previous editions and prepare your relay tech stack.
          </p>
        </Link>
      </div>
    </div>
  );
}
