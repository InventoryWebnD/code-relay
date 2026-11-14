"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        setErrorMsg("Invalid email address or password. Please verify your credentials.");
        setLoading(false);
        return;
      }

      router.push("/profile");
      router.refresh();
    } catch (err) {
      console.error("Sign in error:", err);
      setErrorMsg("An unexpected error occurred during sign in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="editorial-card rounded-3xl p-6 sm:p-10 border border-[rgba(255,255,255,0.1)] bg-[#1a0309]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] relative overflow-hidden">
        {/* Top Specular Neon Highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFA3B9]/60 to-transparent" />

        {/* Header Badge */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative w-5 h-5 shrink-0 rounded overflow-hidden">
            <Image
              src="/assets/cr_logo.png"
              alt="Code Relay Logo"
              width={20}
              height={20}
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-mono text-xs font-bold text-[#FFA3B9] uppercase tracking-wider">
            Code Relay 5.0 · Authentication
          </span>
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F6F0E8] mb-2">
          Participant Sign In
        </h1>
        <p className="text-xs sm:text-sm text-[#E0D4C3] leading-relaxed mb-6 font-normal">
          Enter your registered email and password to access your hacker profile and submissions.
        </p>

        {errorMsg && (
          <div className="rounded-2xl border border-red-500/50 bg-red-950/40 p-3.5 mb-6 flex items-start gap-2.5 text-xs text-red-200">
            <span className="text-red-400 font-bold shrink-0">✕</span>
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@iitbbs.ac.in"
              className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold text-[#E0D4C3] uppercase mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-[rgba(255,255,255,0.12)] bg-[#22020a]/80 px-4 py-2.5 text-sm text-[#F6F0E8] placeholder-[#E0D4C3]/40 focus:border-[#FFA3B9] focus:outline-none focus:ring-2 focus:ring-[#B82A4F]/40 font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-pill-primary w-full py-3 text-xs sm:text-sm font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>SIGN IN TO PROFILE</span>
                  <span>→</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.08)] text-center text-xs text-[#E0D4C3]/80">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/register" className="text-[#FFA3B9] font-bold hover:underline">
            Register for Code Relay 5.0
          </Link>
        </div>
      </div>
    </div>
  );
}
