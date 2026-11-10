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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-statement-title"
    >
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border-3 border-[#160207] bg-[#FAF6F0] p-6 sm:p-8 shadow-hard-xl text-left animate-in fade-in zoom-in-95 duration-150">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="btn-pressable absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-[#160207] bg-[#EADBCC] text-[#620821] hover:bg-[#991B3D] hover:text-white shadow-hard-xs transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`rounded-md border border-[#160207] px-2.5 py-0.5 text-[11px] font-heading font-black uppercase tracking-wider shadow-hard-xs ${
              statement.track === "Web2" ? "bg-[#991B3D] text-white" : "bg-[#4B5D86] text-white"
            }`}
          >
            {statement.track} Track
          </span>
          <span className="rounded border border-[#160207] bg-[#EADBCC] px-2 py-0.5 font-mono text-[11px] font-semibold text-[#380412]">
            {statement.editionLabel}
          </span>
          <span className="font-mono text-xs text-[#6D4B54]">
            {String(statement.number).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h2 id="modal-statement-title" className="font-heading text-2xl sm:text-3xl font-black uppercase text-[#620821] mb-4 pr-8 leading-snug">
          {statement.title}
        </h2>

        {/* Technical Context Tag */}
        <div className="rounded-lg border border-[#160207] bg-[#FFFDF9] px-3.5 py-2 mb-6 shadow-hard-xs flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#620821]">
            Edition Format: {statement.editionType}
          </span>
        </div>

        {/* Faithful Source Description */}
        <div className="mb-6">
          <h3 className="font-mono text-xs font-bold text-[#991B3D] uppercase tracking-wider mb-2">
            Problem Brief
          </h3>
          <div className="rounded-xl border-2 border-[#160207] bg-[#FFFDF9] p-5">
            <p className="text-base text-[#2E181E] leading-relaxed">
              {statement.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-[#E0D4C3] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onCopyCitation(statement)}
            className="btn-pressable inline-flex items-center gap-2 rounded-lg border-2 border-[#160207] bg-[#FFFDF9] px-3.5 py-2 text-xs font-mono font-bold text-[#620821] shadow-hard-xs hover:bg-[#EADBCC]"
          >
            <span>{copiedId === statement.id ? "Copied Citation" : "Copy Title & Citation"}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="btn-pressable rounded-lg border-2 border-[#160207] bg-[#991B3D] hover:bg-[#7A122E] px-5 py-2 text-xs font-heading font-black uppercase tracking-wider text-white shadow-hard-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

