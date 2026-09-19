import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowLeft, Download, LogOut, Search } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { APPLICATION_STATUSES, PAGE_SIZE, type ApplicationStatus } from "@/lib/applyPayload";
import logo from "@/assets/logo.png";

type ApplicationRow = {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  linkedin_url: string | null;
  phone: string | null;
  contact_channel: string;
  location: string | null;
  position_applied_for: string;
  position_slug: string;
  portfolio_url: string | null;
  resume_storage_path: string | null;
  years_of_experience: number | null;
  status: ApplicationStatus;
  internal_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
};

type HistoryRow = {
  id: string;
  from_status: ApplicationStatus | null;
  to_status: ApplicationStatus;
  changed_at: string;
};

type ListRow = Pick<
  ApplicationRow,
  "id" | "full_name" | "email" | "position_applied_for" | "created_at" | "updated_at" | "status" | "reviewed_at"
>;

const formatDate = (value: string | null) => {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
};

const ApplicationAdmin = () => {
  const { toast } = useToast();
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [staffResolved, setStaffResolved] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const [query, setQuery] = useState("");
  const [position, setPosition] = useState("all");
  const [status, setStatus] = useState<"all" | ApplicationStatus>("all");
  const [sortDir, setSortDir] = useState<"desc" | "asc">("desc");
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<ListRow[]>([]);
  const [total, setTotal] = useState(0);
  const [positions, setPositions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<ApplicationRow | null>(null);
  const [reviewerEmail, setReviewerEmail] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [notes, setNotes] = useState("");
  const [detailStatus, setDetailStatus] = useState<ApplicationStatus>("new");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Staff";
    const robots = document.querySelector('meta[name="robots"]') ?? document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("content", "noindex, nofollow, noarchive");
    if (!robots.parentElement) document.head.appendChild(robots);
    return () => {
      robots.setAttribute("content", "index, follow");
    };
  }, []);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });
    supabase.auth.getSession().then(({ data: { session: current } }) => {
      setSession(current);
      setAuthReady(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setIsStaff(false);
      setStaffResolved(true);
      return;
    }
    setStaffResolved(false);
    let cancelled = false;
    supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        setStaffResolved(true);
        if (error || !data) {
          setIsStaff(false);
          void supabase.auth.signOut();
          toast({
            title: "Access denied",
            description: "This account is not authorized.",
            variant: "destructive",
          });
          return;
        }
        setIsStaff(true);
      });
    return () => {
      cancelled = true;
    };
  }, [session, toast]);

  const loadList = useCallback(async () => {
    if (!isStaff) return;
    setLoading(true);
    let request = supabase
      .from("applications")
      .select(
        "id, full_name, email, position_applied_for, created_at, updated_at, status, reviewed_at",
        { count: "exact" },
      )
      .order("created_at", { ascending: sortDir === "asc" })
      .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

    const q = query.trim();
    if (q) {
      const safe = q.replace(/[%*,()]/g, "");
      request = request.or(`full_name.ilike.%${safe}%,email.ilike.%${safe}%`);
    }
    if (position !== "all") request = request.eq("position_applied_for", position);
    if (status !== "all") request = request.eq("status", status);

    const { data, count, error } = await request;
    setLoading(false);
    if (error) {
      toast({ title: "Could not load records", variant: "destructive" });
      return;
    }
    setRows((data ?? []) as ListRow[]);
    setTotal(count ?? 0);
  }, [isStaff, page, position, query, sortDir, status, toast]);

  useEffect(() => {
    void loadList();
  }, [loadList]);

  useEffect(() => {
    if (!isStaff) return;
    supabase
      .from("applications")
      .select("position_applied_for")
      .then(({ data }) => {
        const unique = [...new Set((data ?? []).map((r) => r.position_applied_for).filter(Boolean))];
        unique.sort();
        setPositions(unique);
      });
  }, [isStaff]);

  const loadDetail = useCallback(
    async (id: string) => {
      const { data, error } = await supabase.from("applications").select("*").eq("id", id).maybeSingle();
      if (error || !data) {
        toast({ title: "Record not found", variant: "destructive" });
        setSelectedId(null);
        setDetail(null);
        return;
      }
      const row = data as ApplicationRow;
      setDetail(row);
      setNotes(row.internal_notes ?? "");
      setDetailStatus(row.status);
      if (row.reviewed_by) {
        const { data: reviewer } = await supabase
          .from("admin_users")
          .select("email")
          .eq("user_id", row.reviewed_by)
          .maybeSingle();
        setReviewerEmail(reviewer?.email ?? null);
      } else {
        setReviewerEmail(null);
      }
      const { data: hist } = await supabase
        .from("application_status_history")
        .select("id, from_status, to_status, changed_at")
        .eq("application_id", id)
        .order("changed_at", { ascending: true });
      setHistory((hist ?? []) as HistoryRow[]);
    },
    [toast],
  );

  useEffect(() => {
    if (selectedId) void loadDetail(selectedId);
  }, [loadDetail, selectedId]);

  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSigningIn(false);
    if (error) {
      toast({ title: "Sign-in failed", description: "Check your credentials.", variant: "destructive" });
    }
  };

  const handleSave = async () => {
    if (!detail) return;
    setSaving(true);
    const { error } = await supabase
      .from("applications")
      .update({ status: detailStatus, internal_notes: notes.slice(0, 8000) })
      .eq("id", detail.id);
    setSaving(false);
    if (error) {
      toast({ title: "Could not save", variant: "destructive" });
      return;
    }
    toast({ title: "Saved" });
    await loadDetail(detail.id);
    await loadList();
  };

  const handleResume = async () => {
    if (!detail?.resume_storage_path) return;
    const { data, error } = await supabase.storage.from("resumes").createSignedUrl(detail.resume_storage_path, 60);
    if (error || !data?.signedUrl) {
      toast({ title: "Resume is unavailable", variant: "destructive" });
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener,noreferrer");
  };

  const reviewLabel = useMemo(() => {
    if (!detail?.reviewed_at) return "Not reviewed";
    const who = reviewerEmail ? ` by ${reviewerEmail}` : "";
    return `Reviewed ${formatDate(detail.reviewed_at)}${who}`;
  }, [detail, reviewerEmail]);

  if (!authReady || (session && !staffResolved)) {
    return <div className="min-h-screen bg-background" />;
  }

  if (!session || !isStaff) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <main className="container flex min-h-screen items-center justify-center py-16">
          <form onSubmit={handleSignIn} className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-card p-8">
            <img src={logo} alt="" width={40} height={40} className="h-10 w-10 rounded-xl object-cover" />
            <h1 className="font-display text-2xl font-semibold tracking-tight">Sign in</h1>
            <div className="space-y-2">
              <Label htmlFor="staff-email">Email</Label>
              <Input
                id="staff-email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="staff-password">Password</Label>
              <Input
                id="staff-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={signingIn}>
              {signingIn ? "Signing in…" : "Continue"}
            </Button>
          </form>
        </main>
      </div>
    );
  }

  if (detail && selectedId) {
    return (
      <div className="min-h-screen bg-background font-sans">
        <header className="border-b border-border">
          <div className="container flex h-14 items-center justify-between">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => {
                setSelectedId(null);
                setDetail(null);
              }}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to applications
            </button>
            <Button variant="ghost" size="sm" onClick={() => void supabase.auth.signOut()}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>
        <main className="container grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="space-y-6">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">{detail.position_applied_for}</p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight">{detail.full_name}</h1>
              <p className="mt-2 text-sm text-muted-foreground">{reviewLabel}</p>
            </div>
            <dl className="grid gap-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="mt-0.5 font-medium">{detail.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Location</dt>
                <dd className="mt-0.5 font-medium">{detail.location || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Contact</dt>
                <dd className="mt-0.5 font-medium">{detail.contact_channel}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="mt-0.5 font-medium">{detail.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Profile</dt>
                <dd className="mt-0.5 font-medium break-all">{detail.linkedin_url || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Experience</dt>
                <dd className="mt-0.5 font-medium">
                  {detail.years_of_experience == null ? "—" : `${detail.years_of_experience} years`}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Submitted</dt>
                <dd className="mt-0.5 font-medium">{formatDate(detail.created_at)}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Updated</dt>
                <dd className="mt-0.5 font-medium">{formatDate(detail.updated_at)}</dd>
              </div>
            </dl>
            {detail.resume_storage_path ? (
              <Button type="button" variant="soft" onClick={() => void handleResume()}>
                <Download className="h-4 w-4" />
                View resume
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">No resume on file.</p>
            )}
            <div>
              <h2 className="font-display text-lg font-semibold">Status history</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {history.length === 0 ? <li>No history yet.</li> : null}
                {history.map((h) => (
                  <li key={h.id}>
                    {h.from_status ?? "—"} → {h.to_status} · {formatDate(h.changed_at)}
                  </li>
                ))}
              </ul>
            </div>
          </article>
          <aside className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                value={detailStatus}
                onChange={(e) => setDetailStatus(e.target.value as ApplicationStatus)}
              >
                {APPLICATION_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Internal notes</Label>
              <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={10} maxLength={8000} />
            </div>
            <Button type="button" variant="hero" className="w-full" disabled={saving} onClick={() => void handleSave()}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </aside>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border">
        <div className="container flex h-14 items-center justify-between">
          <p className="font-display text-sm font-semibold tracking-tight">Applications</p>
          <Button variant="ghost" size="sm" onClick={() => void supabase.auth.signOut()}>
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>
      <main className="container py-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="relative min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search name or email"
              value={query}
              onChange={(e) => {
                setPage(0);
                setQuery(e.target.value);
              }}
            />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={position}
            onChange={(e) => {
              setPage(0);
              setPosition(e.target.value);
            }}
          >
            <option value="all">All positions</option>
            {positions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={status}
            onChange={(e) => {
              setPage(0);
              setStatus(e.target.value as "all" | ApplicationStatus);
            }}
          >
            <option value="all">All statuses</option>
            {APPLICATION_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value as "asc" | "desc")}
          >
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Candidate</th>
                <th className="px-4 py-3 font-medium">Position</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Updated</th>
                <th className="px-4 py-3 font-medium">Review</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-8 text-muted-foreground" colSpan={7}>
                    Loading…
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td className="px-4 py-8 text-muted-foreground" colSpan={7}>
                    No applications match.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className="cursor-pointer border-t border-border hover:bg-muted/40"
                    onClick={() => setSelectedId(row.id)}
                  >
                    <td className="px-4 py-3 font-medium">{row.full_name}</td>
                    <td className="px-4 py-3">{row.position_applied_for}</td>
                    <td className="px-4 py-3">{row.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(row.created_at)}</td>
                    <td className="px-4 py-3">
                      <Badge variant="secondary">{row.status}</Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{formatDate(row.updated_at)}</td>
                    <td className="px-4 py-3">{row.reviewed_at ? "Reviewed" : "Unreviewed"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <p>
            {total} total · page {page + 1} of {pageCount}
          </p>
          <div className="flex gap-2">
            <Button type="button" variant="soft" size="sm" disabled={page === 0} onClick={() => setPage((p) => Math.max(0, p - 1))}>
              Previous
            </Button>
            <Button
              type="button"
              variant="soft"
              size="sm"
              disabled={page + 1 >= pageCount}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicationAdmin;
