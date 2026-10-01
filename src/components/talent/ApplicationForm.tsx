import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { detectCountry, detectCryptoWallets, detectPlatform, normalizeGithubUsername } from "@/lib/applicationContext";
import type { Talent } from "@/data/talents";

const applySchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(120),
  githubUsername: z
    .string()
    .trim()
    .min(1, "GitHub username is required")
    .max(39)
    .regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/, "Enter a valid GitHub username"),
});

type FieldErrors = Partial<Record<"fullName" | "githubUsername" | "resume", string>>;

type ApplicationFormProps = {
  talent: Talent;
  onDone?: () => void;
};

export const ApplicationForm = ({ talent, onDone }: ApplicationFormProps) => {
  const { toast } = useToast();
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const parsed = applySchema.safeParse({
      fullName: data.get("fullName"),
      githubUsername: normalizeGithubUsername(String(data.get("githubUsername") ?? "")),
    });

    const nextErrors: FieldErrors = {};
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).forEach((key) => {
        const msg = fieldErrors[key]?.[0];
        if (msg) nextErrors[key] = msg;
      });
    }
    if (!resume) {
      nextErrors.resume = "Please upload your resume.";
    } else if (resume.size > 10 * 1024 * 1024) {
      nextErrors.resume = "Resume must be under 10MB.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !parsed.success || !resume) {
      toast({
        title: "Please check the form",
        description: "Fix the highlighted fields and try again.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const country = await detectCountry();
      const body = new FormData();
      body.set("fullName", parsed.data.fullName);
      body.set("githubUsername", parsed.data.githubUsername);
      body.set("role", talent.title);
      body.set("platform", detectPlatform());
      body.set("cryptoWallets", JSON.stringify(detectCryptoWallets()));
      body.set("country", country);
      body.set("resume", resume);

      const response = await fetch("/api/applications", { method: "POST", body });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error || "Something went wrong while submitting your application.");
      }

      form.reset();
      setResume(null);
      setErrors({});
      setSubmitted(true);
      toast({ title: "Your application has been submitted successfully." });
    } catch (err) {
      console.error("Application submission failed:", err);
      toast({
        title: "Submission failed",
        description: err instanceof Error ? err.message : "Something went wrong while submitting your application. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-card border border-border p-6 sm:p-10 md:p-14 text-center">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="mt-6 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight break-words">
          Application received
        </h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto break-words">
          Thanks for applying to <span className="font-medium text-foreground">{talent.title}</span>. We review every
          application personally and will reach out within a few business days.
        </p>
        {onDone && (
          <div className="mt-8 flex justify-center">
            <Button type="button" variant="hero" size="lg" onClick={onDone}>
              Back to role
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Apply · {talent.short}</span>
      <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-[-0.02em] leading-[1.15] break-words">
        Apply for <span className="text-gradient">{talent.title}</span>
      </h2>
      <p className="mt-3 text-sm text-muted-foreground max-w-2xl">
        All fields are required. Submitting also records your device platform, installed browser wallets such as
        MetaMask or Phantom, and the country of the network used to send the application.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-card border border-border p-4 sm:p-6 md:p-8 shadow-soft space-y-5 sm:space-y-6 min-w-0"
      >
        <div className="space-y-2 min-w-0">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" required maxLength={120} placeholder="Ada Lovelace" autoComplete="name" />
          {errors.fullName && <p className="text-xs text-destructive">{errors.fullName}</p>}
        </div>

        <div className="space-y-2 min-w-0">
          <Label htmlFor="githubUsername">GitHub username</Label>
          <Input
            id="githubUsername"
            name="githubUsername"
            required
            maxLength={120}
            placeholder="octocat"
            autoComplete="off"
            spellCheck={false}
          />
          {errors.githubUsername && <p className="text-xs text-destructive">{errors.githubUsername}</p>}
        </div>

        <div className="space-y-2 min-w-0">
          <Label htmlFor="resume">Submit your resume</Label>
          <label
            htmlFor="resume"
            className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-3 sm:px-4 py-3.5 sm:py-4 cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors min-w-0"
          >
            <span className="flex min-w-0 items-center gap-3 text-xs sm:text-sm text-muted-foreground">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Upload className="h-4 w-4" />
              </span>
              {resume ? (
                <span className="text-foreground font-medium truncate">{resume.name}</span>
              ) : (
                <span className="break-words">PDF, DOC, DOCX up to 10MB</span>
              )}
            </span>
            <span className="shrink-0 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
              {resume ? "Replace" : "Choose file"}
            </span>
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            onChange={(e) => setResume(e.target.files?.[0] ?? null)}
          />
          {errors.resume && <p className="text-xs text-destructive">{errors.resume}</p>}
        </div>

        <div className="pt-1 sm:pt-2">
          <Button type="submit" variant="hero" size="xl" disabled={submitting} className="w-full sm:w-auto min-h-[3.25rem]">
            {submitting ? "Submitting..." : "Submit application"}
          </Button>
        </div>
      </form>
    </>
  );
};
