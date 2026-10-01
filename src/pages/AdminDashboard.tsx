import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ADMIN_KEY_STORAGE = "tbl-admin-key";

type ApplicationRow = {
  id: string;
  fullName: string;
  role: string;
  githubUsername: string;
  resumeFileName: string;
  platform: string;
  cryptoWallets: string[];
  hasCryptoWallet: boolean;
  country: string;
  reviewed: boolean;
  remarks: string;
  createdAt: string | null;
};

async function adminFetch(key: string, init?: RequestInit) {
  const response = await fetch("/api/admin/applications", {
    ...init,
    headers: {
      "x-admin-key": key,
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  const text = await response.text();
  let payload: { error?: string; applications?: ApplicationRow[] } | null = null;
  try {
    payload = text ? (JSON.parse(text) as { error?: string; applications?: ApplicationRow[] }) : null;
  } catch {
    payload = null;
  }
  if (!response.ok) throw new Error(payload?.error || text || "Could not load applications.");
  return payload;
}

const AdminDashboard = () => {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "");
  const [draftKey, setDraftKey] = useState("");
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [remarkDrafts, setRemarkDrafts] = useState<Record<string, string>>({});

  const load = useCallback(async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const payload = await adminFetch(key);
      setApplications(payload?.applications ?? []);
      setRemarkDrafts({});
    } catch (err) {
      setApplications([]);
      setError(err instanceof Error ? err.message : "Could not load applications.");
      if (err instanceof Error && err.message.toLowerCase().includes("admin key")) {
        sessionStorage.removeItem(ADMIN_KEY_STORAGE);
        setAdminKey("");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (adminKey) void load(adminKey);
  }, [adminKey, load]);

  const applicationsByDate = useMemo(
    () =>
      [...applications].sort((left, right) => {
        const leftTime = left.createdAt ? Date.parse(left.createdAt) : 0;
        const rightTime = right.createdAt ? Date.parse(right.createdAt) : 0;
        return rightTime - leftTime;
      }),
    [applications],
  );

  const counts = useMemo(() => {
    const reviewed = applications.filter((application) => application.reviewed).length;
    return { total: applications.length, reviewed, pending: applications.length - reviewed };
  }, [applications]);

  const signIn = (event: React.FormEvent) => {
    event.preventDefault();
    const next = draftKey.trim();
    if (!next) return;
    sessionStorage.setItem(ADMIN_KEY_STORAGE, next);
    setAdminKey(next);
  };

  const downloadResume = async (application: ApplicationRow) => {
    const response = await fetch(`/api/admin/applications?download=${encodeURIComponent(application.id)}`, {
      headers: { "x-admin-key": adminKey },
    });
    if (!response.ok) {
      setError("Could not download that resume.");
      return;
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = application.resumeFileName || "resume";
    link.click();
    URL.revokeObjectURL(url);
  };

  const saveRemarks = async (application: ApplicationRow, remarks: string) => {
    if (remarks === application.remarks) {
      setRemarkDrafts((current) => {
        if (!(application.id in current)) return current;
        const next = { ...current };
        delete next[application.id];
        return next;
      });
      return;
    }
    setSavingId(application.id);
    setError("");
    try {
      await adminFetch(adminKey, {
        method: "PATCH",
        body: JSON.stringify({ id: application.id, remarks }),
      });
      setApplications((current) => current.map((row) => (row.id === application.id ? { ...row, remarks } : row)));
      setRemarkDrafts((current) => {
        const next = { ...current };
        delete next[application.id];
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save remarks.");
    } finally {
      setSavingId(null);
    }
  };

  const deleteResume = async (application: ApplicationRow) => {
    const confirmed = window.confirm(`Delete the resume for ${application.fullName}? The application will stay.`);
    if (!confirmed) return;
    setSavingId(application.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/applications?resume=${encodeURIComponent(application.id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const text = await response.text();
      let payload: { error?: string } | null = null;
      try {
        payload = text ? (JSON.parse(text) as { error?: string }) : null;
      } catch {
        payload = null;
      }
      if (!response.ok) throw new Error(payload?.error || text || "Could not delete that resume.");
      setApplications((current) =>
        current.map((row) => (row.id === application.id ? { ...row, resumeFileName: "" } : row)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete that resume.");
    } finally {
      setSavingId(null);
    }
  };

  const deleteApplication = async (application: ApplicationRow) => {
    const confirmed = window.confirm(`Delete ${application.fullName}'s application? This cannot be undone.`);
    if (!confirmed) return;
    setSavingId(application.id);
    setError("");
    try {
      const response = await fetch(`/api/admin/applications?id=${encodeURIComponent(application.id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const text = await response.text();
      let payload: { error?: string } | null = null;
      try {
        payload = text ? (JSON.parse(text) as { error?: string }) : null;
      } catch {
        payload = null;
      }
      if (!response.ok) throw new Error(payload?.error || text || "Could not delete that application.");
      setApplications((current) => current.filter((row) => row.id !== application.id));
      setRemarkDrafts((current) => {
        if (!(application.id in current)) return current;
        const next = { ...current };
        delete next[application.id];
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete that application.");
    } finally {
      setSavingId(null);
    }
  };

  const setReviewed = async (application: ApplicationRow, reviewed: boolean) => {
    setSavingId(application.id);
    setApplications((current) => current.map((row) => (row.id === application.id ? { ...row, reviewed } : row)));
    try {
      await adminFetch(adminKey, {
        method: "PATCH",
        body: JSON.stringify({ id: application.id, reviewed }),
      });
    } catch (err) {
      setApplications((current) =>
        current.map((row) => (row.id === application.id ? { ...row, reviewed: application.reviewed } : row)),
      );
      setError(err instanceof Error ? err.message : "Could not update the review flag.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main id="main" className="container py-12 sm:py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Admin</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Applications</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Review submissions stored in Firestore. The checkbox marks whether an administrator has reviewed the
          application.
        </p>

        {!adminKey ? (
          <form onSubmit={signIn} className="mt-8 max-w-md space-y-4 rounded-2xl border border-border bg-card p-6">
            <div className="space-y-2">
              <Label htmlFor="adminKey">Admin key</Label>
              <Input
                id="adminKey"
                type="password"
                value={draftKey}
                onChange={(event) => setDraftKey(event.target.value)}
                autoComplete="current-password"
              />
            </div>
            <Button type="submit" variant="hero">
              Open dashboard
            </Button>
          </form>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border border-border px-3 py-1">{counts.total} total</span>
              <span className="rounded-full border border-border px-3 py-1">{counts.pending} awaiting review</span>
              <span className="rounded-full border border-border px-3 py-1">{counts.reviewed} reviewed</span>
              <Button type="button" variant="outline" size="sm" onClick={() => void load(adminKey)} disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  sessionStorage.removeItem(ADMIN_KEY_STORAGE);
                  setAdminKey("");
                  setApplications([]);
                }}
              >
                Lock
              </Button>
            </div>
            {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
            <div className="mt-6 rounded-2xl border border-border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reviewed</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>GitHub</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Wallet</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-muted-foreground">
                        No applications stored yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    applicationsByDate.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <Checkbox
                            checked={application.reviewed}
                            disabled={savingId === application.id}
                            onCheckedChange={(checked) => void setReviewed(application, checked === true)}
                            aria-label={`Mark ${application.fullName} as reviewed`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{application.fullName}</TableCell>
                        <TableCell>{application.role}</TableCell>
                        <TableCell>{application.githubUsername}</TableCell>
                        <TableCell>{application.platform}</TableCell>
                        <TableCell>
                          {application.hasCryptoWallet ? application.cryptoWallets.join(", ") : "None"}
                        </TableCell>
                        <TableCell>{application.country}</TableCell>
                        <TableCell>
                          {application.resumeFileName ? (
                            <button
                              type="button"
                              className="text-primary underline-offset-4 hover:underline"
                              onClick={() => void downloadResume(application)}
                            >
                              {application.resumeFileName}
                            </button>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-muted-foreground">
                          {application.createdAt ? new Date(application.createdAt).toLocaleString() : "—"}
                        </TableCell>
                        <TableCell className="min-w-72">
                          <div className="flex items-start gap-2">
                            <Textarea
                              value={remarkDrafts[application.id] ?? application.remarks ?? ""}
                              disabled={savingId === application.id}
                              maxLength={2000}
                              rows={2}
                              placeholder="Add a comment"
                              aria-label={`Remarks for ${application.fullName}`}
                              className="min-h-16 min-w-48 text-sm"
                              onChange={(event) =>
                                setRemarkDrafts((current) => ({ ...current, [application.id]: event.target.value }))
                              }
                              onBlur={(event) => void saveRemarks(application, event.target.value.trim())}
                            />
                            <div className="flex shrink-0 flex-col gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={savingId === application.id}
                                onClick={() => void deleteApplication(application)}
                              >
                                Delete
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled={savingId === application.id || !application.resumeFileName}
                                onClick={() => void deleteResume(application)}
                              >
                                Delete resume
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
