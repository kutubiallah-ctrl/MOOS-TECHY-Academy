/**
 * MOOS ACADEMY BOOKPRENEUR STUDIO — MANUSCRIPT INGESTION & CONVERSION SECTION
 * 
 * Enables creators and educators to upload raw manuscripts (.pdf, .docx, .doc),
 * inspect structural chapter/section/table/equation extraction, verify original
 * file checksum preservation, and convert into editable DRAFT educational codices.
 */

import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  BookOpen,
  Hash,
  Calculator,
  Grid,
  ShieldCheck,
  RefreshCw,
  FolderOpen
} from "lucide-react";
import { manuscriptIngestionService } from "../../services/manuscriptIngestionService";
import { bookpreneurService } from "../../services/bookpreneurService";
import { IngestedManuscriptPackage, PreservedOriginalFile } from "../../types/manuscript";
import { MarketplaceResource } from "../../types/bookpreneur";
import { UserSession } from "../../types/identity";

interface ManuscriptIngestionSectionProps {
  activeSession: UserSession;
  onResourceCreated?: (resource: MarketplaceResource) => void;
  notify: (message: string, type?: "success" | "error") => void;
}

export const ManuscriptIngestionSection: React.FC<ManuscriptIngestionSectionProps> = ({
  activeSession,
  onResourceCreated,
  notify
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressState, setProgressState] = useState<{ step: string; percentage: number }>({
    step: "Ready",
    percentage: 0
  });
  const [ingestedPackage, setIngestedPackage] = useState<IngestedManuscriptPackage | null>(null);
  const [selectedPreviewChapter, setSelectedPreviewChapter] = useState<number>(1);
  const [conversionModalOpen, setConversionModalOpen] = useState(false);
  const [conversionForm, setConversionForm] = useState({
    title: "",
    subtitle: "",
    subject: "Mathematics & Science",
    educationLevel: "SSS_1_3",
    price: 4500,
    currency: "NGN" as "NGN" | "USD",
    category: "education_pedagogy"
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await processFile(e.target.files[0]);
    }
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setProgressState({ step: "Validating file signature...", percentage: 10 });

    try {
      const result = await manuscriptIngestionService.ingestFile(
        file,
        {
          creatorId: activeSession.userId,
          creatorRole: activeSession.role === "ADMIN" ? "ADMIN" : "CREATOR",
          preserveOriginalFile: true,
          targetDiscipline: "STEM"
        },
        (step, percentage) => {
          setProgressState({ step, percentage });
        }
      );

      setIngestedPackage(result);
      setSelectedPreviewChapter(result.chapters[0]?.chapterNumber || 1);
      setConversionForm((prev) => ({
        ...prev,
        title: result.metadata.detectedTitle || file.name.replace(/\.[^/.]+$/, ""),
        subtitle: `${result.chapters.length} Rigorous Scaffolding Chapters`
      }));

      notify(`Successfully extracted ${result.chapters.length} chapters from ${file.name}.`);
    } catch (err: any) {
      notify(err.message || "Failed to process manuscript.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRunSampleIngestion = async (sampleType: "math_treatise" | "stem_curriculum") => {
    setIsProcessing(true);
    setProgressState({ step: "Synthesizing sample curriculum manuscript...", percentage: 15 });

    try {
      // Simulate real ingestion pipeline for immediate evaluation
      await new Promise((r) => setTimeout(r, 400));
      setProgressState({ step: "Extracting pedagogical sections & derivations...", percentage: 50 });
      await new Promise((r) => setTimeout(r, 400));
      setProgressState({ step: "Hashing file integrity & calculating word counts...", percentage: 85 });
      await new Promise((r) => setTimeout(r, 300));

      const isMath = sampleType === "math_treatise";
      const sampleId = `pkg-demo-${Date.now()}`;
      const sampleSize = isMath ? 4194304 : 8388608;
      const samplePkg: IngestedManuscriptPackage = {
        id: sampleId,
        packageId: sampleId,
        creatorId: activeSession.userId,
        creatorName: activeSession.displayName || "Dr. O. Adeleke",
        extractionStatus: "success",
        extractionWarnings: [],
        originalFile: {
          fileId: `file-demo-${Date.now()}`,
          fileName: isMath
            ? "Comprehensive_Algebra_and_Analytical_Geometry_Syllabus.docx"
            : "Senior_Secondary_Physics_Mechanics_and_Fields.pdf",
          fileSize: sampleSize,
          fileSizeBytes: sampleSize,
          mimeType: isMath
            ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            : "application/pdf",
          fileExtension: isMath ? "docx" : "pdf",
          checksum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          fileHashSha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          uploadedAt: new Date().toISOString()
        },
        metadata: {
          detectedTitle: isMath
            ? "Comprehensive Secondary Mathematics: Algebraic Scaffolding & Analytical Geometry"
            : "Senior Secondary Physics: First-Principles Mechanics and Field Dynamics",
          detectedAuthor: activeSession.displayName || "Dr. O. Adeleke",
          detectedSubject: isMath ? "Mathematics" : "Physics",
          detectedWordCount: 48500,
          totalEstimatedWords: 48500,
          detectedChapterCount: 6,
          totalChaptersCount: 6,
          detectedSectionCount: 18,
          hasTables: true,
          hasLists: true,
          hasImagesOrFigures: false,
          figureReferences: [],
          tableCount: 14,
          extractedTablesCount: 14,
          extractedEquationsCount: 88,
          formatDetected: isMath ? "docx" : "pdf"
        },
        chapters: [
          {
            id: "ing-ch-1",
            chapterNumber: 1,
            title: isMath ? "Foundations of Quadratic Equations & Factorization" : "Kinematics: Velocity, Acceleration & Projectile Trajectories",
            rawTextExcerpt: isMath
              ? "Quadratic equations model physical trajectories and optimization parabolas across engineering domains..."
              : "Kinematics provides the analytical geometry of motion independent of the causative dynamical forces...",
            totalWordCount: 8200,
            estimatedWordCount: 8200,
            sections: [
              {
                id: "ing-sec-1-1",
                sectionNumber: "1.1",
                title: isMath ? "Derivation of the General Quadratic Formula" : "Uniform Linear Motion and Vector Decompositions",
                content: isMath
                  ? "Given the canonical second-degree polynomial ax^2 + bx + c = 0 (a != 0), divide through by a to obtain x^2 + (b/a)x + c/a = 0. Completing the square yields (x + b/2a)^2 = (b^2 - 4ac)/4a^2."
                  : "Velocity is the first time derivative of displacement vector s(t). For constant acceleration a, v = u + at and s = ut + 0.5at^2.",
                contentMarkdown: isMath
                  ? "Given the canonical second-degree polynomial ax^2 + bx + c = 0 (a != 0), divide through by a to obtain x^2 + (b/a)x + c/a = 0. Completing the square yields (x + b/2a)^2 = (b^2 - 4ac)/4a^2."
                  : "Velocity is the first time derivative of displacement vector s(t). For constant acceleration a, v = u + at and s = ut + 0.5at^2.",
                wordCount: 420,
                equations: [isMath ? "x = (-b ± √(b² - 4ac)) / 2a" : "v² = u² + 2as", isMath ? "Δ = b² - 4ac" : "s = ut + ½at²"]
              },
              {
                id: "ing-sec-1-2",
                sectionNumber: "1.2",
                title: isMath ? "Discriminant Invariants and Nature of Roots" : "Projectile Motion in a Uniform Gravitational Field",
                content: isMath
                  ? "The discriminant Δ dictates root character: Real and distinct when Δ > 0, coincident when Δ = 0, and complex conjugate when Δ < 0."
                  : "Resolving horizontal and vertical components: vx = u cos θ, vy = u sin θ - gt. Range R = (u² sin 2θ) / g.",
                contentMarkdown: isMath
                  ? "The discriminant Δ dictates root character: Real and distinct when Δ > 0, coincident when Δ = 0, and complex conjugate when Δ < 0."
                  : "Resolving horizontal and vertical components: vx = u cos θ, vy = u sin θ - gt. Range R = (u² sin 2θ) / g.",
                wordCount: 380,
                equations: [isMath ? "b² - 4ac ≥ 0" : "R = (u² sin 2θ) / g"]
              }
            ],
            detectedTablesCount: 2,
            detectedEquationsCount: 16
          },
          {
            id: "ing-ch-2",
            chapterNumber: 2,
            title: isMath ? "Exponential and Logarithmic Relations" : "Newton's Laws of Motion & Momentum Invariants",
            rawTextExcerpt: isMath
              ? "Exponential relations describe continuous compounding and radioactive decay..."
              : "Newton's second law expresses the rate of change of momentum proportional to net applied force...",
            totalWordCount: 7900,
            estimatedWordCount: 7900,
            sections: [
              {
                id: "ing-sec-2-1",
                sectionNumber: "2.1",
                title: isMath ? "Laws of Indices and Exponential Functions" : "Impulse and Linear Momentum Conservation",
                content: isMath
                  ? "For all positive real bases a and b: a^m * a^n = a^(m+n), (a^m)^n = a^(mn)."
                  : "F_net = dp/dt. When net external force is zero, total momentum is conserved.",
                contentMarkdown: isMath
                  ? "For all positive real bases a and b: a^m * a^n = a^(m+n), (a^m)^n = a^(mn)."
                  : "F_net = dp/dt. When net external force is zero, total momentum is conserved.",
                wordCount: 390,
                equations: [isMath ? "log_b(xy) = log_b x + log_b y" : "F Δt = m Δv"]
              }
            ],
            detectedTablesCount: 3,
            detectedEquationsCount: 14
          },
          {
            id: "ing-ch-3",
            chapterNumber: 3,
            title: isMath ? "Trigonometric Identifications & Circular Functions" : "Work, Mechanical Energy & Power Principles",
            rawTextExcerpt: "Fundamental relationships governing right-angled geometries and harmonic progressions...",
            totalWordCount: 8400,
            estimatedWordCount: 8400,
            sections: [],
            detectedTablesCount: 2,
            detectedEquationsCount: 18
          }
        ],
        fullTextContent: "Synthesized curriculum manuscript content for rapid evaluation and ingestion.",
        ingestedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setIngestedPackage(samplePkg);
      setSelectedPreviewChapter(1);
      setConversionForm((prev) => ({
        ...prev,
        title: samplePkg.metadata.detectedTitle,
        subtitle: `${samplePkg.chapters.length} Rigorous Scaffolding Chapters`
      }));

      notify(`Sample manuscript ingested: ${samplePkg.chapters.length} chapters extracted.`);
    } catch (err: any) {
      notify(err.message || "Failed to load sample.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExecuteConversion = () => {
    if (!ingestedPackage) return;

    try {
      const resource = bookpreneurService.createResourceFromIngestedManuscript(
        activeSession,
        ingestedPackage,
        {
          title: conversionForm.title,
          subtitle: conversionForm.subtitle,
          authorName: activeSession.displayName || ingestedPackage.metadata.detectedAuthor,
          category: conversionForm.category as any,
          subject: conversionForm.subject,
          educationLevel: conversionForm.educationLevel as any,
          format: "digital_textbook",
          price: Number(conversionForm.price),
          currency: conversionForm.currency
        }
      );

      setConversionModalOpen(false);
      onResourceCreated?.(resource);
      notify(`Draft resource '${resource.title}' created in Creator Hub with status 'DRAFT'.`);
    } catch (err: any) {
      notify(err.message || "Conversion failed", "error");
    }
  };

  const activeChapterData = ingestedPackage?.chapters.find(
    (c) => c.chapterNumber === selectedPreviewChapter
  );

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-wider mb-2">
              <UploadCloud className="h-3.5 w-3.5" />
              Direct File Ingestion Pipeline
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Submit Manuscripts & Educational Files
            </h2>
            <p className="text-xs text-slate-500 max-w-2xl mt-1 leading-relaxed">
              Upload ordinary PDF or Word (.docx) documents. Our structural extractor parses chapters, mathematical formulas, tables, and section headings while preserving original file checksums and creator copyright.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleRunSampleIngestion("math_treatise")}
              disabled={isProcessing}
              className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Load Sample Math .DOCX</span>
            </button>
            <button
              type="button"
              onClick={() => handleRunSampleIngestion("stem_curriculum")}
              disabled={isProcessing}
              className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Load Sample Physics .PDF</span>
            </button>
          </div>
        </div>

        {/* Drag & Drop Upload Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-4 ${
            dragActive
              ? "border-purple-600 bg-purple-50/70"
              : "border-slate-200 hover:border-purple-400 bg-slate-50/50 hover:bg-purple-50/20"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm text-purple-600">
            <UploadCloud className="h-10 w-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Drag and drop your manuscript here, or <span className="text-purple-600 underline">browse files</span>
            </h3>
            <p className="text-xs text-slate-500">
              Supports PDF, Word (.docx, .doc) up to 50MB. Preserves raw chapters, derivations, and tables.
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400">
            <span>✓ Structural Chapter Extraction</span>
            <span>•</span>
            <span>✓ Original File Preservation</span>
            <span>•</span>
            <span>✓ Retains Draft Status</span>
          </div>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-2 text-xs">
            <div className="flex items-center justify-between font-bold text-purple-900">
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin text-purple-600" />
                <span>{progressState.step}</span>
              </span>
              <span>{progressState.percentage}%</span>
            </div>
            <div className="w-full bg-purple-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressState.percentage}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Ingested Package Details */}
      {ingestedPackage && (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Manuscript Ingested & Verified
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-1">{ingestedPackage.metadata.detectedTitle}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Author: {ingestedPackage.metadata.detectedAuthor} • File: {ingestedPackage.originalFile.fileName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConversionModalOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-600/20 flex items-center gap-2 transition"
              >
                <span>Convert to Marketplace Resource</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-center gap-1">
                <Layers className="h-3 w-3" />
                Chapters Detected
              </span>
              <p className="text-xl font-black text-purple-700">{ingestedPackage.chapters.length}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-center gap-1">
                <Calculator className="h-3 w-3" />
                Equations Extracted
              </span>
              <p className="text-xl font-black text-indigo-700">{ingestedPackage.metadata.extractedEquationsCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-center gap-1">
                <Grid className="h-3 w-3" />
                Tables Parsed
              </span>
              <p className="text-xl font-black text-emerald-700">{ingestedPackage.metadata.extractedTablesCount}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center justify-center gap-1">
                <ShieldCheck className="h-3 w-3" />
                Checksum Preserved
              </span>
              <p className="text-xs font-mono font-bold text-slate-700 truncate pt-1">
                {ingestedPackage.originalFile.fileHashSha256.substring(0, 12)}...
              </p>
            </div>
          </div>

          {/* Chapter Inspector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-purple-600" />
              Extracted Chapters Architecture
            </h4>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {ingestedPackage.chapters.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setSelectedPreviewChapter(ch.chapterNumber)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-2 ${
                    selectedPreviewChapter === ch.chapterNumber
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>Ch {ch.chapterNumber}</span>
                  <span className="text-[10px] opacity-80 max-w-[120px] truncate">{ch.title}</span>
                </button>
              ))}
            </div>

            {activeChapterData && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h5 className="text-sm font-black text-slate-900">
                    Chapter {activeChapterData.chapterNumber}: {activeChapterData.title}
                  </h5>
                  <span className="text-xs text-slate-500 font-medium">
                    {activeChapterData.sections.length} Sections • ~{activeChapterData.estimatedWordCount} Words
                  </span>
                </div>

                <div className="space-y-3">
                  {activeChapterData.sections.map((sec) => (
                    <div key={sec.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">
                          {sec.sectionNumber} {sec.title}
                        </span>
                        <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                          {sec.equations?.length || 0} Equations
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{sec.contentMarkdown}</p>
                      {sec.equations && sec.equations.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {sec.equations.map((eq, i) => (
                            <span key={i} className="px-2.5 py-1 rounded bg-slate-900 text-emerald-400 font-mono text-xs">
                              {eq}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {activeChapterData.sections.length === 0 && (
                    <div className="p-3 bg-white rounded-xl text-xs text-slate-600 italic">
                      "{activeChapterData.rawTextExcerpt}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Convert to Resource Modal */}
      {conversionModalOpen && ingestedPackage && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-black text-slate-900">Publish Ingested Manuscript as Draft</h3>
              <button
                type="button"
                onClick={() => setConversionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              The resource will be initialized as an authentic <strong>DRAFT</strong> in your Creator Hub with an immutable 70/30 creator revenue split. It will NOT be released publicly until human review and publication approval.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Resource Title</label>
                <input
                  type="text"
                  value={conversionForm.title}
                  onChange={(e) => setConversionForm({ ...conversionForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Subtitle / Edition Detail</label>
                <input
                  type="text"
                  value={conversionForm.subtitle}
                  onChange={(e) => setConversionForm({ ...conversionForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subject</label>
                  <input
                    type="text"
                    value={conversionForm.subject}
                    onChange={(e) => setConversionForm({ ...conversionForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Education Level</label>
                  <select
                    value={conversionForm.educationLevel}
                    onChange={(e) => setConversionForm({ ...conversionForm, educationLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600 bg-white"
                  >
                    <option value="SSS_1_3">Senior Secondary (SSS 1-3 / WAEC)</option>
                    <option value="JSS_1_3">Junior Secondary (JSS 1-3 / BECE)</option>
                    <option value="TERTIARY_UNDERGRAD">Tertiary & University</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Price (₦ NGN)</label>
                  <input
                    type="number"
                    value={conversionForm.price}
                    onChange={(e) => setConversionForm({ ...conversionForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div className="p-3 bg-purple-50 rounded-xl flex flex-col justify-center">
                  <span className="text-[10px] font-bold uppercase text-purple-700">70% Creator Earnings</span>
                  <span className="text-base font-black text-purple-900">
                    ₦{Math.round(conversionForm.price * 0.7).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setConversionModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteConversion}
                className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20"
              >
                Confirm Creation (Save as Draft)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
