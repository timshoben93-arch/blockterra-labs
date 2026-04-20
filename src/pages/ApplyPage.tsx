import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { getTalentBySlug } from "@/data/talents";
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

const ApplyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const talent = slug ? getTalentBySlug(slug) : undefined;
  const { toast } = useToast();
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (talent) document.title = `Apply · ${talent.title} | BlockTerraLab`;
  }, [talent]);

  if (!talent) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      toast({ title: "Please check the form", description: first ?? "Invalid input", variant: "destructive" });
      return;
    }

    if (!resume) {
      toast({ title: "Resume required", description: "Please upload your resume.", variant: "destructive" });
      return;
    }

    if (resume.size > 10 * 1024 * 1024) {
      toast({ title: "File too large", description: "Resume must be under 10MB.", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    // Submit to Google Form (no-cors: response is opaque but submission succeeds)
    const formData = new FormData();
    formData.append("entry.416377519", talent.title);
    formData.append("entry.2005620554", String(parsed.data.firstName));
    formData.append("entry.384439563", String(parsed.data.lastName));
    formData.append("entry.1045781291", String(parsed.data.email));
    formData.append("entry.1065046570", String(parsed.data.contact));
    formData.append("entry.1166974658", String(parsed.data.location));
    formData.append("entry.839337160", String(parsed.data.social));
    formData.append("entry.1961290135", String(parsed.data.experience));

    try {
      await fetch(
        "https://docs.google.com/forms/d/e/1FAIpQLSfT4euNBTT2UYkPLXdQuFO9Hs0dOqjvKpwFXzsHsROxMXhY_A/formResponse",
        { method: "POST", mode: "no-cors", body: formData }
      );
    } catch {
      // no-cors hides errors; treat as fire-and-forget
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur sticky top-0 z-40">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src={logo} alt="BlockTerraLab" className="h-8 w-8 rounded-lg object-contain" />
            <span className="font-display font-bold tracking-tight">BlockTerraLab</span>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" name="lastName" required maxLength={80} placeholder="Lovelace" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">WhatsApp / Telegram / Discord</Label>
                <Input id="contact" name="contact" required maxLength={150} placeholder="@telegram_handle or +1 555 0100" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Where do you live (country, city)?</Label>
                <Input id="location" name="location" required maxLength={150} placeholder="USA, Seattle" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="social">LinkedIn or X profile</Label>
                <Input id="social" name="social" required maxLength={255} placeholder="https://linkedin.com/in/yourname" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience (years)</Label>
                <Input id="experience" name="experience" type="number" min={0} max={60} step={1} required placeholder="5" />
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
