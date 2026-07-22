import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getTalentBySlug } from "@/data/talents";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";

const applySchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(80),
  lastName: z.string().trim().min(1, "Last name is required").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  contact: z.string().trim().min(3, "Contact is required").max(150),
  location: z.string().trim().min(2, "Location is required").max(150),
  social: z.string().trim().min(4, "LinkedIn or X profile is required").max(255),
  experience: z.coerce.number().min(0, "Must be 0 or more").max(60, "Must be 60 or less"),
});

type FieldErrors = Partial<Record<
  "firstName" | "lastName" | "email" | "contact" | "location" | "social" | "experience" | "resume",
  string
>>;

const ApplyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const talent = slug ? getTalentBySlug(slug) : undefined;
  const { toast } = useToast();
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (talent) document.title = `Apply · ${talent.title} | TokenBrickLabs`;
  }, [talent]);

  if (!talent) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Prevent duplicate submissions while a request is in progress
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
      // 1. Upload resume to the `resumes` storage bucket (unique path per submission)
      let resumeUrl: string | null = null;
      if (resume) {
        const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const path = `${talent.slug}/${crypto.randomUUID()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(path, resume, { cacheControl: "3600", upsert: false });
        if (uploadError) throw uploadError;
        // Store the storage object path; a signed URL can be minted on demand.
        resumeUrl = path;
      }

      // 2. Insert the application row (RLS allows public INSERT only)
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

      // 3. Success: reset form state
      form.reset();
      setResume(null);
      setErrors({});
      setSubmitted(true);
      toast({ title: "Your application has been submitted successfully." });
    } catch (err) {
      // Log full error for debugging; show friendly message to user.
      console.error("Application submission failed:", err);
      toast({
        title: "Submission failed",
        description:
          "Something went wrong while submitting your application. Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="TokenBrickLabs" className="h-8 w-8 rounded-lg object-contain" />
            <span className="font-display font-bold tracking-tight">TokenBrickLabs</span>
          </Link>
          <Link
            to={`/talents/${talent.slug}`}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to role
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-14 md:py-20">
        {submitted ? (
          <div className="rounded-3xl bg-gradient-card border border-border p-10 md:p-14 shadow-elevated text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h1 className="mt-6 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Application received
            </h1>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              Thanks for applying to <span className="font-medium text-foreground">{talent.title}</span>.
              We review every application personally and will reach out within a few business days.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/">Back to home</Link>
              </Button>
            </div>
          </div>
        ) : (
          <>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
              Apply · {talent.short}
            </span>
            <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.05]">
              Apply for <span className="text-gradient">{talent.title}</span>
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl">
              Tell us about yourself. All fields are required.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 rounded-3xl bg-card border border-border p-6 md:p-10 shadow-soft space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" name="firstName" required maxLength={80} placeholder="Ada" />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" required maxLength={80} placeholder="Lovelace" />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">WhatsApp / Telegram / Discord</Label>
                <Input id="contact" name="contact" required maxLength={150} placeholder="@telegram_handle or +1 555 0100" />
                {errors.contact && <p className="text-xs text-destructive">{errors.contact}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Where do you live (country, city)?</Label>
                <Input id="location" name="location" required maxLength={150} placeholder="USA, Seattle" />
                {errors.location && <p className="text-xs text-destructive">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="social">LinkedIn or X profile</Label>
                <Input id="social" name="social" required maxLength={255} placeholder="https://linkedin.com/in/yourname" />
                {errors.social && <p className="text-xs text-destructive">{errors.social}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input id="experience" name="experience" type="number" min={0} max={60} step={1} required placeholder="5" />
                {errors.experience && <p className="text-xs text-destructive">{errors.experience}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="resume">Submit your resume</Label>
                <label
                  htmlFor="resume"
                  className="flex items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-4 cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors"
                >
                  <span className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Upload className="h-4 w-4" />
                    </span>
                    {resume ? (
                      <span className="text-foreground font-medium truncate max-w-[260px] sm:max-w-none">
                        {resume.name}
                      </span>
                    ) : (
                      <span>PDF, DOC, DOCX up to 10MB</span>
                    )}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
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

              <div className="pt-2">
                <Button type="submit" variant="hero" size="xl" disabled={submitting} className="w-full sm:w-auto">
                  {submitting ? "Submitting..." : "Submit application"}
                </Button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  );
};

export default ApplyPage;
