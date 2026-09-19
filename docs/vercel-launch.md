# Launch TokenBrickLabs on Vercel

This site is a **Vite + React SPA**. Vercel only hosts the frontend. Applications, auth, and resume storage live in **Supabase**. Deploy both; Vercel alone cannot accept talent applications.

Do **not** put `SUPABASE_SERVICE_ROLE_KEY` (or any `sb_secret_…` key) in Vercel. Those belong only in the Supabase project.

---

## 1. What Vercel should build

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Root directory | repository root (this folder) |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 20.x (or 22.x) |

`vercel.json` already rewrites extension-less paths to `index.html`, so routes such as `/talents`, `/company`, and `/application_` work on refresh.

---

## 2. Deploy the frontend

### Option A — Dashboard

1. Push this repo to GitHub (or GitLab / Bitbucket).
2. Open [vercel.com](https://vercel.com) → **Add New** → **Project**.
3. Import the repository.
4. Confirm the table in section 1.
5. Add environment variables (section 3) **before** the first production deploy.
6. Click **Deploy**.

### Option B — CLI

```bash
npm i -g vercel
cd path/to/blockterralab-rwa-showcase
vercel login
vercel        # preview
vercel --prod # production
```

The CLI will prompt for the same build settings if they are not already linked.

---

## 3. Vercel environment variables

Set these for **Production** (and Preview if you test apply/admin there). Vite inlines `VITE_*` at **build** time. After changing them, **Redeploy** (not just restart).

| Name | Where to copy it | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | Supabase → Project Settings → API → Project URL | `https://<project-ref>.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Same page → publishable / anon key | Safe for the browser. Never use the service-role key. |

Optional unused by this app: `VITE_SUPABASE_PROJECT_ID`. You can omit it.

Local `.env` is not uploaded. Copy values into the Vercel project UI (Settings → Environment Variables).

---

## 4. Deploy Supabase (required for Talent + `/application_`)

Do this in the [Supabase dashboard](https://supabase.com/dashboard) for project `idtbtlkldjzykgxqonvd` (or your linked project), **before** expecting live applications.

### 4.1 Database

Apply all files in `supabase/migrations/`, including `20260919120000_secure_applications.sql`.

CLI (after `npx supabase login` and `npx supabase link --project-ref <ref>`):

```bash
npx supabase db push
```

Or paste the SQL in **SQL Editor** and run it.

Confirm:

- Tables `admin_users`, `applications`, `application_status_history` exist
- RLS is enabled; the `anon` role cannot read or write `applications`
- Bucket `resumes` exists and is **not** public

### 4.2 Edge Function

```bash
npx supabase functions deploy submit-application --no-verify-jwt
```

Hosted functions already receive `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`. Do not copy those into Vercel.

`supabase/config.toml` sets `verify_jwt = false` for this function so the public apply form can call it with the publishable key only.

### 4.3 Staff user

1. Authentication → Users → add a staff email/password.
2. Copy the user’s UUID.
3. Run:

```sql
INSERT INTO public.admin_users (user_id, email)
VALUES ('<auth-user-uuid>', '<staff@tokenbricklabs.com>');
```

Only rows in `admin_users` can load application data.

### 4.4 Auth URLs

Authentication → URL Configuration:

- **Site URL:** `https://<your-production-domain>`
- **Redirect URLs:** add
  - `https://<your-production-domain>/**`
  - `https://<your-vercel-app>.vercel.app/**`
  - optional preview: `https://<preview-url>/**`

Without this, staff sign-in on `/application_` can fail after deploy.

---

## 5. Custom domain

1. Vercel → Project → **Domains** → add `tokenbricklabs.com` (and `www` if needed).
2. Point DNS as Vercel instructs (usually `A` / `CNAME`).
3. Set the same origin as **Site URL** in Supabase (section 4.4).
4. Redeploy after DNS is live if you changed env vars.

The SPA does not hard-code the Vercel hostname.

---

## 6. What not to configure on Vercel

| Item | Why |
|---|---|
| Service-role / secret key | Would leak in the browser bundle |
| Serverless API routes for apply | Apply is handled by the Supabase function |
| Indexing `/application_` | Already `Disallow` in `public/robots.txt`; still protect with Auth + RLS |

`/application_` is intentionally absent from public navigation. That is not access control. Staff still must sign in.

---

## 7. Post-deploy checklist

1. Open the production URL. Home, Talent, Company, Docs, and a role page load.
2. Refresh `/talents/blockchain-architect`. You should stay on that route (SPA rewrite).
3. Submit a test application (resume PDF under 10MB). You should see **Application received**, not a generic network error.
4. In Supabase Table Editor, the row appears in `applications` (not only `job_applications`).
5. Visit `https://<domain>/application_` (type the URL). Sign in as staff and confirm the row, notes, status, and resume download.
6. Sign out. Confirm the list is gone. Confirm header/footer still have no “applications” link.
7. Confirm `https://<domain>/robots.txt` contains `Disallow: /application_`.

If step 3 fails with “function was not found”, the Edge Function is not deployed. If REST says table `applications` is missing, the migration was not applied.

---

## 8. Preview deployments

Each Git push can create a `*.vercel.app` preview.

- Add Preview env vars if you want apply/admin to work there (same `VITE_*` values as production is typical for one Supabase project).
- Add the preview origin to Supabase Redirect URLs, or previews will break staff login.
- Treat preview URLs as public. Do not rely on an obscure `/application_` path.

---

## 9. Local check before you ship

```bash
npm install
npm run build
npm run preview
```

Then hit `/talents` and `/application_` on the preview port. `npm run preview` does not apply Vercel rewrites; use a production deploy to confirm refresh-on-deep-link.

---

## 10. Rollback

Vercel → Deployments → open a previous successful production deployment → **Promote to Production**.

Database migrations are **not** rolled back by that. Do not “undo” `applications` RLS in an emergency by granting `anon` SELECT.
