import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Trash2, FileText, RefreshCw, Search } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  formatAppliedAt,
  isHttpUrl,
  resumeFileName,
  type JobApplication,
} from "@/lib/applications";

type EditDraft = {
  first_name: string;
  last_name: string;
  email: string;
  whatsapp_tg_disc: string;
  country: string;
  linkedin_url: string;
  experience: string;
  job_title: string;
  job_id: string;
};

const emptyDraft = (): EditDraft => ({
  first_name: "",
  last_name: "",
  email: "",
  whatsapp_tg_disc: "",
  country: "",
  linkedin_url: "",
  experience: "",
  job_title: "",
  job_id: "",
});

const draftFrom = (row: JobApplication): EditDraft => ({
  first_name: row.first_name,
  last_name: row.last_name,
  email: row.email,
  whatsapp_tg_disc: row.whatsapp_tg_disc,
  country: row.country ?? "",
  linkedin_url: row.linkedin_url ?? "",
  experience: row.experience ?? "",
  job_title: row.job_title,
  job_id: row.job_id,
});

export default function Applications() {
  const { toast } = useToast();
  const [rows, setRows] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<JobApplication | null>(null);
  const [draft, setDraft] = useState<EditDraft>(emptyDraft());
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<JobApplication | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setRows([]);
    } else {
      setRows(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    document.title = "Applications | TokenBrickLabs";
    const desc = document.querySelector('meta[name="description"]');
    if (desc) {
      desc.setAttribute("content", "Review, update, or remove developer applications submitted to TokenBrickLabs.");
    }
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [
        row.first_name,
        row.last_name,
        row.email,
        row.job_title,
        row.job_id,
        row.country,
        row.whatsapp_tg_disc,
        row.linkedin_url,
        row.experience,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [query, rows]);

  const openResume = async (path: string) => {
    const { data, error: signedError } = await supabase.storage.from("resumes").createSignedUrl(path, 60);
    if (signedError || !data?.signedUrl) {
      toast({
        title: "Resume unavailable",
        description: signedError?.message ?? "Could not create a download link.",
        variant: "destructive",
      });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    const { error: updateError } = await supabase
      .from("job_applications")
      .update({
        first_name: draft.first_name.trim(),
        last_name: draft.last_name.trim(),
        email: draft.email.trim(),
        whatsapp_tg_disc: draft.whatsapp_tg_disc.trim(),
        country: draft.country.trim() || null,
        linkedin_url: draft.linkedin_url.trim() || null,
        experience: draft.experience.trim() || null,
        job_title: draft.job_title.trim(),
        job_id: draft.job_id.trim(),
      })
      .eq("id", editing.id);

    setSaving(false);
    if (updateError) {
      toast({ title: "Update failed", description: updateError.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application updated" });
    setEditing(null);
    await load();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setBusy(true);
    if (deleting.resume_url) {
      await supabase.storage.from("resumes").remove([deleting.resume_url]);
    }
    const { error: deleteError } = await supabase.from("job_applications").delete().eq("id", deleting.id);
    setBusy(false);
    if (deleteError) {
      toast({ title: "Delete failed", description: deleteError.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application deleted" });
    setDeleting(null);
    await load();
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      <Header />
      <main id="main">
        <section className="border-b border-border/60">
          <div className="container py-16 sm:py-20 lg:py-24">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-primary">Talent · Inbox</p>
            <div className="mt-5 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                  Applications
                </h1>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Every developer application submitted through the talent form. Open a resume, correct a field, or
                  remove a record.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {loading ? "Loading…" : `${filtered.length} of ${rows.length}`}
                </p>
                <Button variant="soft" onClick={() => void load()} disabled={loading}>
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
              </div>
            </div>

            <div className="relative mt-10 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, or role"
                className="pl-10"
                aria-label="Search applications"
              />
            </div>
          </div>
        </section>

        <section className="container py-10 lg:py-14">
          {error ? (
            <Card className="border-destructive/40 bg-card p-6 sm:p-8">
              <h2 className="font-display text-xl font-semibold">Could not load applications</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{error}</p>
              <Button className="mt-6" variant="hero" onClick={() => void load()}>
                Try again
              </Button>
            </Card>
          ) : loading ? (
            <p className="text-sm text-muted-foreground">Fetching submissions from Supabase…</p>
          ) : filtered.length === 0 ? (
            <Card className="bg-card p-8">
              <p className="text-base text-muted-foreground">
                {rows.length === 0
                  ? "No applications have been submitted yet."
                  : "No applications match that search."}
              </p>
            </Card>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <div className="font-medium text-foreground">
                          {row.first_name} {row.last_name}
                        </div>
                        <a href={`mailto:${row.email}`} className="text-xs text-primary hover:underline">
                          {row.email}
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{row.job_title}</div>
                        <div className="text-xs text-muted-foreground">{row.job_id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{row.whatsapp_tg_disc}</div>
                        {row.linkedin_url ? (
                          isHttpUrl(row.linkedin_url) ? (
                            <a
                              href={row.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-primary hover:underline"
                            >
                              Profile
                            </a>
                          ) : (
                            <div className="text-xs text-muted-foreground">{row.linkedin_url}</div>
                          )
                        ) : null}
                      </TableCell>
                      <TableCell>{row.country ?? "—"}</TableCell>
                      <TableCell>{row.experience ? `${row.experience} yrs` : "—"}</TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {formatAppliedAt(row.created_at)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {row.resume_url ? (
                            <Button
                              variant="ghost"
                              size="icon"
                              aria-label={`Open resume for ${row.first_name} ${row.last_name}`}
                              onClick={() => void openResume(row.resume_url as string)}
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                          ) : null}
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Edit ${row.first_name} ${row.last_name}`}
                            onClick={() => {
                              setEditing(row);
                              setDraft(draftFrom(row));
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={`Delete ${row.first_name} ${row.last_name}`}
                            onClick={() => setDeleting(row)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        {row.resume_url ? (
                          <p className="mt-1 text-[11px] text-muted-foreground">
                            {resumeFileName(row.resume_url)}
                          </p>
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </section>
      </main>
      <Footer />

      <Dialog open={Boolean(editing)} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit application</DialogTitle>
            <DialogDescription>Update the registered details, then save.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-first">First name</Label>
                <Input
                  id="edit-first"
                  value={draft.first_name}
                  onChange={(e) => setDraft((d) => ({ ...d, first_name: e.target.value }))}
                  maxLength={80}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-last">Last name</Label>
                <Input
                  id="edit-last"
                  value={draft.last_name}
                  onChange={(e) => setDraft((d) => ({ ...d, last_name: e.target.value }))}
                  maxLength={80}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={draft.email}
                onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-contact">WhatsApp / Telegram / Discord</Label>
              <Input
                id="edit-contact"
                value={draft.whatsapp_tg_disc}
                onChange={(e) => setDraft((d) => ({ ...d, whatsapp_tg_disc: e.target.value }))}
                maxLength={150}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-country">Location</Label>
              <Input
                id="edit-country"
                value={draft.country}
                onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))}
                maxLength={150}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-social">LinkedIn or X</Label>
              <Input
                id="edit-social"
                value={draft.linkedin_url}
                onChange={(e) => setDraft((d) => ({ ...d, linkedin_url: e.target.value }))}
                maxLength={255}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-role">Role</Label>
                <Input
                  id="edit-role"
                  value={draft.job_title}
                  onChange={(e) => setDraft((d) => ({ ...d, job_title: e.target.value }))}
                  maxLength={160}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">Role slug</Label>
                <Input
                  id="edit-slug"
                  value={draft.job_id}
                  onChange={(e) => setDraft((d) => ({ ...d, job_id: e.target.value }))}
                  maxLength={80}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-exp">Experience (years)</Label>
              <Input
                id="edit-exp"
                value={draft.experience}
                onChange={(e) => setDraft((d) => ({ ...d, experience: e.target.value }))}
                maxLength={40}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="soft" type="button" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button variant="hero" type="button" disabled={saving} onClick={() => void saveEdit()}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleting)} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this application?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleting
                ? `${deleting.first_name} ${deleting.last_name} — ${deleting.job_title}. This removes the record and attached resume.`
                : null}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={busy}
              onClick={(e) => {
                e.preventDefault();
                void confirmDelete();
              }}
            >
              {busy ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
