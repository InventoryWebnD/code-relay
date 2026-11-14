import { ProblemStatement } from "@/data/problemStatements";

interface ProblemStatementModalProps {
  statement: ProblemStatement | null;
  onClose: () => void;
  copiedId: string | null;
  onCopyCitation: (statement: ProblemStatement) => void;
}

export default function ProblemStatementModal({
  statement,
  onClose,
  copiedId,
  onCopyCitation,
}: ProblemStatementModalProps) {
  if (!statement) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-statement-title"
    >
      <div className="editorial-card relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 text-left animate-in fade-in zoom-in-95 duration-200 border border-[rgba(255,255,255,0.15)] shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] bg-white/5 text-[#E0D4C3] hover:bg-[#991B3D] hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`rounded-full border px-3 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider ${
              statement.track === "Web2"
                ? "border-[#991B3D]/50 bg-[#991B3D]/30 text-[#F6F0E8]"
                : "border-[#4B5D86]/50 bg-[#4B5D86]/30 text-[#F6F0E8]"
            }`}
          >
            {statement.track} Track
          </span>
          <span className="rounded-full border border-[rgba(255,255,255,0.1)] bg-white/5 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#E0D4C3]">
            {statement.editionLabel}
          </span>
          <span className="font-mono text-xs text-[#E8738D]">
            {String(statement.number).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h2 id="modal-statement-title" className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#F6F0E8] mb-4 pr-8 leading-snug">
          {statement.title}
        </h2>

        {/* Technical Context Tag */}
        <div className="rounded-xl border border-[rgba(255,255,255,0.08)] bg-white/5 px-4 py-2.5 mb-6 flex items-center justify-between">
          <span className="font-mono text-xs font-medium text-[#E0D4C3]">
            Edition Format: <strong className="text-[#F6F0E8]">{statement.editionType}</strong>
          </span>
        </div>

        {/* Faithful Source Description */}
        <div className="mb-6">
          <h3 className="font-mono text-xs font-bold text-[#E8738D] uppercase tracking-wider mb-2">
            Problem Brief
          </h3>
          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#120205] p-5">
            <p className="text-base text-[#E0D4C3] leading-relaxed font-normal">
              {statement.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onCopyCitation(statement)}
            className="btn-pill-secondary inline-flex items-center gap-2 py-2 px-4 text-xs font-mono font-bold"
          >
            <span>{copiedId === statement.id ? "✓ Copied Citation" : "Copy Title & Citation"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn-pill-primary py-2 px-6 text-xs font-bold uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
