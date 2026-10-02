import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ADMIN_KEY_STORAGE = "tbl-admin-key";

function formatLocation(application: Pick<ApplicationRow, "city" | "region" | "country">) {
  const parts = [application.city, application.region, application.country]
    .map((part) => (part ?? "").trim())
    .filter(Boolean);
  const unique = parts.filter((part, index) => parts.findIndex((item) => item.toLowerCase() === part.toLowerCase()) === index);
  return unique.join(", ") || "—";
}

type ApplicationRow = {
  id: string;
  fullName: string;
  role: string;
  githubUsername: string;
  resumeFileName: string;
  resumeAvailable: boolean;
  platform: string;
  cryptoWallets: string[];
  hasCryptoWallet: boolean;
  city: string;
  region: string;
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

  const counts = useMemo(() => ({ total: applications.length }), [applications]);

  const signIn = (event: React.FormEvent) => {
    event.preventDefault();
    const next = draftKey.trim();
    if (!next) return;
    sessionStorage.setItem(ADMIN_KEY_STORAGE, next);
    setAdminKey(next);
  };

  const markReviewed = async (application: ApplicationRow) => {
    if (application.reviewed) return;
    setApplications((current) => current.map((row) => (row.id === application.id ? { ...row, reviewed: true } : row)));
    try {
      await adminFetch(adminKey, {
        method: "PATCH",
        body: JSON.stringify({ id: application.id, reviewed: true }),
      });
    } catch (err) {
      setApplications((current) =>
        current.map((row) => (row.id === application.id ? { ...row, reviewed: false } : row)),
      );
      setError(err instanceof Error ? err.message : "Could not mark the application as reviewed.");
    }
  };

  const downloadResume = async (application: ApplicationRow) => {
    void markReviewed(application);
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
    const confirmed = window.confirm(
      `Delete the resume file for ${application.fullName}? The filename will stay on the application.`,
    );
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
        current.map((row) => (row.id === application.id ? { ...row, resumeAvailable: false } : row)),
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

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <main id="main" className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">Admin</p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">Applications</h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Review submissions stored in Firestore.
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
              <Table className="table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[10%] px-2">Name</TableHead>
                    <TableHead className="w-[11%] px-2">Role</TableHead>
                    <TableHead className="w-[8%] px-2">GitHub</TableHead>
                    <TableHead className="w-[8%] px-2">Platform</TableHead>
                    <TableHead className="w-[7%] px-2">Wallet</TableHead>
                    <TableHead className="w-[12%] px-2">Country</TableHead>
                    <TableHead className="w-[11%] px-2">Resume</TableHead>
                    <TableHead className="w-[10%] px-2">Submitted</TableHead>
                    <TableHead className="w-[23%] px-2">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.length === 0 && !loading ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-muted-foreground">
                        No applications stored yet.
                      </TableCell>
                    </TableRow>
                  ) : (
                    applicationsByDate.map((application) => (
                      <TableRow
                        key={application.id}
                        className={
                          application.reviewed
                            ? undefined
                            : "bg-[#c3edbf] text-slate-950 hover:bg-[#b4e6af]"
                        }
                      >
                        <TableCell className="break-words px-2 font-medium">{application.fullName}</TableCell>
                        <TableCell className="break-words px-2">{application.role}</TableCell>
                        <TableCell className="break-all px-2">{application.githubUsername}</TableCell>
                        <TableCell className="break-words px-2">{application.platform}</TableCell>
                        <TableCell className="break-words px-2">
                          {application.hasCryptoWallet ? application.cryptoWallets.join(", ") : "None"}
                        </TableCell>
                        <TableCell className="break-words px-2">{formatLocation(application)}</TableCell>
                        <TableCell className="px-2">
                          {application.resumeFileName && application.resumeAvailable ? (
                            <button
                              type="button"
                              className="break-all text-left text-primary underline-offset-4 hover:underline"
                              onClick={() => void downloadResume(application)}
                            >
                              {application.resumeFileName}
                            </button>
                          ) : application.resumeFileName ? (
                            <span className="break-all text-sky-300">{application.resumeFileName}</span>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className={application.reviewed ? "px-2 text-muted-foreground" : "px-2 text-slate-700"}>
                          {application.createdAt ? (
                            <>
                              <span className="block">{new Date(application.createdAt).toLocaleDateString()}</span>
                              <span className="block">{new Date(application.createdAt).toLocaleTimeString()}</span>
                            </>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                        <TableCell className="px-2">
                          <div className="flex items-start gap-2">
                            <Textarea
                              value={remarkDrafts[application.id] ?? application.remarks ?? ""}
                              disabled={savingId === application.id}
                              maxLength={2000}
                              rows={2}
                              placeholder="Add a comment"
                              aria-label={`Remarks for ${application.fullName}`}
                              className="min-h-16 min-w-0 flex-1 text-sm placeholder:text-white/20"
                              onClick={() => void markReviewed(application)}
                              onFocus={() => void markReviewed(application)}
                              onChange={(event) =>
                                setRemarkDrafts((current) => ({ ...current, [application.id]: event.target.value }))
                              }
                              onBlur={(event) => void saveRemarks(application, event.target.value.trim())}
                            />
                            <div className="flex w-6 shrink-0 flex-col gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                title="Delete application"
                                aria-label={`Delete ${application.fullName}'s application`}
                                className="h-6 w-6 min-w-6 border-transparent bg-red-600 p-0 text-white hover:bg-red-700"
                                disabled={savingId === application.id}
                                onClick={() => void deleteApplication(application)}
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                title="Delete resume"
                                aria-label={`Delete resume for ${application.fullName}`}
                                className="h-6 w-6 min-w-6 border-transparent bg-blue-600 p-0 text-white hover:bg-blue-700"
                                disabled={savingId === application.id || !application.resumeAvailable}
                                onClick={() => void deleteResume(application)}
                              />
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
