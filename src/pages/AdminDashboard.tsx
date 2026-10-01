import { useCallback, useEffect, useMemo, useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const payload = (await response.json().catch(() => null)) as { error?: string; applications?: ApplicationRow[] } | null;
  if (!response.ok) throw new Error(payload?.error || "Could not load applications.");
  return payload;
}

const AdminDashboard = () => {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem(ADMIN_KEY_STORAGE) ?? "");
  const [draftKey, setDraftKey] = useState("");
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async (key: string) => {
    setLoading(true);
    setError("");
    try {
      const payload = await adminFetch(key);
      setApplications(payload?.applications ?? []);
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
                    applications.map((application) => (
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
