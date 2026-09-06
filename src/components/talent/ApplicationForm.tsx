import { useState } from "react";
import { CheckCircle2, Upload } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Talent } from "@/data/talents";

const applySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  contact: z.string().trim().min(3, "Contact is required").max(150),
  location: z.string().trim().min(2, "Location is required").max(150),
  social: z.string().trim().min(4, "LinkedIn or X profile is required").max(255),
  experience: z.coerce.number().min(0, "Must be 0 or more").max(60, "Must be 60 or less"),
});

type FieldErrors = Partial<
  Record<"firstName" | "lastName" | "email" | "contact" | "location" | "social" | "experience" | "resume", string>
>;

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
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      contact: data.get("contact"),
      location: data.get("location"),
      social: data.get("social"),
      experience: data.get("experience"),
    });

    const nextErrors: FieldErrors = {};
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      (Object.keys(fieldErrors) as Array<keyof typeof fieldErrors>).forEach((k) => {
        const msg = fieldErrors[k]?.[0];
        if (msg) (nextErrors as Record<string, string>)[k as string] = msg;
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
      let resumeUrl: string | null = null;
      if (resume) {
        const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${talent.slug}/${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(path, resume, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        resumeUrl = path;
      }

      const { error: insertError } = await supabase.from("job_applications").insert({
        job_id: talent.slug,
        job_title: talent.title,
        first_name: parsed.data.firstName,
        last_name: parsed.data.lastName,
        email: parsed.data.email,
        whatsapp_tg_disc: parsed.data.contact,
        linkedin_url: parsed.data.social,
        country: parsed.data.location,
        resume_url: resumeUrl,
        experience: String(parsed.data.experience),
      });
      if (insertError) throw insertError;

      form.reset();
      setResume(null);
      setErrors({});
      setSubmitted(true);
      toast({ title: "Your application has been submitted successfully." });
    } catch (err) {
      console.error("Application submission failed:", err);
      toast({
        title: "Submission failed",
        description: "Something went wrong while submitting your application. Please try again in a moment.",
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
      <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.02em] leading-[1.15] break-words">
        Apply for <span className="text-gradient">{talent.title}</span>
      </h2>
      <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl">
        Tell us about yourself. All fields are required.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 sm:mt-8 rounded-2xl sm:rounded-3xl bg-card border border-border p-4 sm:p-6 md:p-8 shadow-soft space-y-5 sm:space-y-6 min-w-0"
      >
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="space-y-2 min-w-0">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" required maxLength={80} placeholder="Ada" />
            {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
          </div>
          <div className="space-y-2 min-w-0">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" required maxLength={80} placeholder="Lovelace" />
            {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-2 min-w-0">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>

        <div className="space-y-2 min-w-0">
          <Label htmlFor="contact">WhatsApp / Telegram / Discord</Label>
          <Input id="contact" name="contact" required maxLength={150} placeholder="@telegram_handle or +1 555 0100" />
          {errors.contact && <p className="text-xs text-destructive">{errors.contact}</p>}
        </div>

        <div className="space-y-2 min-w-0">
          <Label htmlFor="location">Where do you live (country, city)?</Label>
          <Input id="location" name="location" required maxLength={150} placeholder="USA, Seattle" />
          {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
        </div>

        <div className="space-y-2 min-w-0">
          <Label htmlFor="social">LinkedIn or X profile</Label>
          <Input id="social" name="social" required maxLength={255} placeholder="https://linkedin.com/in/yourname" />
          {errors.social && <p className="text-xs text-destructive">{errors.social}</p>}
        </div>

        <div className="space-y-2 min-w-0">
          <Label htmlFor="experience">Experience (years)</Label>
          <Input id="experience" name="experience" type="number" min={0} max={60} step={1} required placeholder="5" />
          {errors.experience && <p className="text-xs text-destructive">{errors.experience}</p>}
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
