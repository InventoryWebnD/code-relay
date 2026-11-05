"use client";

import { useState } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState<"both" | "web2" | "web3">("both");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none">
      <div 
        className="relative w-full max-w-lg rounded-2xl border-3 border-[#160207] bg-[#FAF6F0] p-6 sm:p-8 shadow-hard-xl text-left animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="btn-pressable absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#EADBCC] text-[#620821] hover:bg-[#991B3D] hover:text-white shadow-hard-xs transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-xl border-2 border-[#160207] bg-[#991B3D] text-white shadow-hard">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-black uppercase text-[#620821]">
              You&apos;re on the Priority Roster!
            </h3>
            <p className="text-sm text-[#48232C] max-w-sm mx-auto leading-relaxed">
              We&apos;ve logged your address <span className="font-mono text-[#991B3D] font-bold">({email})</span>. You will receive immediate priority access as soon as registration portals open.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-6 py-2.5 text-sm font-bold uppercase tracking-wider text-white shadow-hard"
              >
                Back to Homepage
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-xs font-bold text-[#991B3D] uppercase tracking-wider">
                Early Admission Portal · Edition 5.0
              </span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#620821] mb-2">
              Register for Code Relay 5.0
            </h3>
            <p className="text-sm text-[#48232C] leading-relaxed mb-6">
              Official collegiate team registrations are launching soon. Lock in early access, track problem briefings, and mentor pairing updates.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-2">
                  Institutional / Personal Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hacker@iitbbs.ac.in or team@domain.com"
                  className="w-full rounded-xl border-2 border-[#160207] bg-[#FFFFFF] px-4 py-3 text-sm font-medium text-[#1E030A] placeholder-slate-400 shadow-hard-xs focus:border-[#991B3D] focus:outline-none"
                />
              </div>

              {/* Track Preference */}
              <div>
                <label className="block font-mono text-xs font-bold text-[#48232C] uppercase mb-2">
                  Preferred Track Orientation
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTrack("both")}
                    className={`btn-pressable rounded-lg border-2 border-[#160207] px-3 py-2 text-xs font-bold uppercase transition-all shadow-hard-xs ${
                      track === "both"
                        ? "bg-[#620821] text-white"
                        : "bg-[#EADBCC] text-[#48232C] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    Both Tracks
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrack("web2")}
                    className={`btn-pressable rounded-lg border-2 border-[#160207] px-3 py-2 text-xs font-bold uppercase transition-all shadow-hard-xs ${
                      track === "web2"
                        ? "bg-[#991B3D] text-white"
                        : "bg-[#EADBCC] text-[#48232C] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    Web2 Track
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrack("web3")}
                    className={`btn-pressable rounded-lg border-2 border-[#160207] px-3 py-2 text-xs font-bold uppercase transition-all shadow-hard-xs ${
                      track === "web3"
                        ? "bg-[#4B5D86] text-white"
                        : "bg-[#EADBCC] text-[#48232C] hover:bg-[#FAF6F0]"
                    }`}
                  >
                    Web3 Track
                  </button>
                </div>
              </div>

              {/* Notice */}
              <div className="rounded-lg border border-[#160207] bg-[#EADBCC]/60 p-3 text-xs text-[#48232C] font-medium">
                Teams: 2 to 4 members per team. Hybrid format at IIT Bhubaneswar campus and virtual relay rooms.
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full btn-pressable rounded-xl border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] py-3.5 text-center font-heading text-base font-black uppercase tracking-wider text-white shadow-hard-md"
              >
                Submit Early Registration Request
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
