import React from "react";
import { X, Award, ShieldCheck, Printer, CheckCircle2, QrCode, Calendar, BookOpen, Download } from "lucide-react";
import { ControlledCertificate } from "../../types/achievement";

interface CertificateModalProps {
  certificate: ControlledCertificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  isOpen,
  onClose
}) => {
  if (!isOpen || !certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="certificate-viewer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300/60 overflow-hidden my-8 animate-in fade-in zoom-in duration-200">
        {/* Top Control Bar */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <ShieldCheck className="h-4 w-4" />
            <span>MOOS Academy Official Learning Recognition Certificate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-print-certificate"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition"
              title="Print Certificate"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              type="button"
              id="btn-close-certificate"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Printable Area) */}
        <div className="p-8 sm:p-12 bg-gradient-to-b from-amber-50/40 via-white to-slate-50 relative">
          {/* Subtle Guilloche Watermark Border */}
          <div className="border-2 border-dashed border-amber-400/80 rounded-2xl p-6 sm:p-10 relative overflow-hidden">
            {/* Background Seal Watermark */}
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
              <Award className="w-80 h-80 text-amber-900" />
            </div>

            {/* Institution Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-amber-100 text-amber-800 mb-1">
                <Award className="h-8 w-8" />
              </div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-amber-800">
                MOOS Academy
              </h2>
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
                Certificate of Academic Achievement
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                {certificate.issuer}
              </p>
            </div>

            {/* Decorative Divider */}
            <div className="my-6 flex items-center justify-center gap-3">
              <div className="h-px bg-amber-300 w-24" />
              <span className="text-amber-500 font-serif text-sm">✦</span>
              <div className="h-px bg-amber-300 w-24" />
            </div>

            {/* Recipient Notice */}
            <div className="text-center space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                This controlled credential is officially conferred upon
              </p>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-indigo-950 underline decoration-amber-400 decoration-2 underline-offset-8">
                {certificate.learnerName}
              </h3>
              <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed pt-2">
                for verified academic demonstration and rigorous competency mastery in
              </p>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                {certificate.title}
              </h4>
              <p className="text-xs font-medium text-slate-500">
                {certificate.subjectOrProgramme} • Level: {certificate.educationalLevel}
              </p>
            </div>

            {/* Evidence & Verification Box */}
            <div className="mt-8 rounded-xl border border-amber-200/80 bg-white/90 p-4 text-left space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 border-b border-slate-100 pb-1.5">
                <span className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  AUTHENTICATED EVIDENCE OF MASTERY
                </span>
                <span className="font-mono text-slate-500">
                  ID: {certificate.id}
                </span>
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Demonstration Criterion: </span>
                {certificate.evidenceSummary.criterion}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <span className="text-indigo-950 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  Performance: {certificate.evidenceSummary.scoreOrPercentage}
                </span>
                <span className="font-mono text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  Verification Code: {certificate.verificationCode}
                </span>
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              {certificate.signatories.map((sig, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-1 w-48 mx-auto sm:mx-0">
                    {sig.name}
                  </div>
                  <div className="text-[11px] font-bold text-slate-900">{sig.title}</div>
                  <div className="text-[10px] text-slate-500">{sig.department}</div>
                </div>
              ))}

              <div className="text-center sm:text-right space-y-1">
                <div className="text-[11px] font-semibold text-slate-500">Conferred Date</div>
                <div className="text-xs font-bold text-slate-900">
                  {new Date(certificate.issuedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </div>
                <div className="text-[10px] text-slate-400">{certificate.jurisdiction}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center text-[11px] text-slate-500">
          MOOS Academy learning recognition certificates are non-transferable and calibrated against official NERDC / WAEC / Cambridge standards.
        </div>
      </div>
    </div>
  );
};
