-- Secure applications store for talent submissions.
-- Public has no table access. Inserts go through the submit-application Edge Function (service role).
-- Staff access is via Supabase Auth + admin_users + RLS.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status') THEN
    CREATE TYPE public.application_status AS ENUM (
      'new',
      'reviewing',
      'interviewing',
      'offered',
      'rejected',
      'hired',
      'withdrawn'
    );
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email text NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  full_name text NOT NULL,
  email text NOT NULL,
  linkedin_url text,
  phone text,
  contact_channel text NOT NULL,
  location text,
  position_applied_for text NOT NULL,
  position_slug text NOT NULL,
  portfolio_url text,
  resume_storage_path text,
  years_of_experience integer,
  status public.application_status NOT NULL DEFAULT 'new',
  internal_notes text,
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  idempotency_key text UNIQUE,
  CONSTRAINT applications_email_format CHECK (char_length(email) BETWEEN 3 AND 255),
  CONSTRAINT applications_years_range CHECK (
    years_of_experience IS NULL OR (years_of_experience >= 0 AND years_of_experience <= 60)
  )
);

CREATE TABLE IF NOT EXISTS public.application_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications (id) ON DELETE CASCADE,
  from_status public.application_status,
  to_status public.application_status NOT NULL,
  changed_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
  changed_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS applications_created_at_idx ON public.applications (created_at DESC);
CREATE INDEX IF NOT EXISTS applications_status_idx ON public.applications (status);
CREATE INDEX IF NOT EXISTS applications_position_idx ON public.applications (position_applied_for);
CREATE INDEX IF NOT EXISTS applications_email_idx ON public.applications (lower(email));
CREATE INDEX IF NOT EXISTS applications_position_slug_idx ON public.applications (position_slug);
CREATE INDEX IF NOT EXISTS application_status_history_app_idx
  ON public.application_status_history (application_id, changed_at DESC);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS applications_set_updated_at ON public.applications;
CREATE TRIGGER applications_set_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.record_application_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.application_status_history (application_id, from_status, to_status, changed_by)
    VALUES (NEW.id, NULL, NEW.status, auth.uid());
    RETURN NEW;
  END IF;

  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO public.application_status_history (application_id, from_status, to_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS applications_status_history ON public.applications;
CREATE TRIGGER applications_status_history
  AFTER INSERT OR UPDATE OF status ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.record_application_status_change();

CREATE OR REPLACE FUNCTION public.protect_application_applicant_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF auth.role() = 'service_role' THEN
    RETURN NEW;
  END IF;

  NEW.first_name = OLD.first_name;
  NEW.last_name = OLD.last_name;
  NEW.full_name = OLD.full_name;
  NEW.email = OLD.email;
  NEW.linkedin_url = OLD.linkedin_url;
  NEW.phone = OLD.phone;
  NEW.contact_channel = OLD.contact_channel;
  NEW.location = OLD.location;
  NEW.position_applied_for = OLD.position_applied_for;
  NEW.position_slug = OLD.position_slug;
  NEW.portfolio_url = OLD.portfolio_url;
  NEW.resume_storage_path = OLD.resume_storage_path;
  NEW.years_of_experience = OLD.years_of_experience;
  NEW.idempotency_key = OLD.idempotency_key;
  NEW.created_at = OLD.created_at;
  NEW.reviewed_at = now();
  NEW.reviewed_by = auth.uid();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS applications_protect_applicant_fields ON public.applications;
CREATE TRIGGER applications_protect_applicant_fields
  BEFORE UPDATE ON public.applications
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_application_applicant_fields();

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_staff() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_status_history ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.admin_users FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.applications FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.application_status_history FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.admin_users TO authenticated;
GRANT SELECT, UPDATE ON public.applications TO authenticated;
GRANT SELECT ON public.application_status_history TO authenticated;

GRANT USAGE ON TYPE public.application_status TO authenticated, service_role;
GRANT ALL ON TABLE public.admin_users TO service_role;
GRANT ALL ON TABLE public.applications TO service_role;
GRANT ALL ON TABLE public.application_status_history TO service_role;

DROP POLICY IF EXISTS "staff read own admin row" ON public.admin_users;
CREATE POLICY "staff read own admin row"
  ON public.admin_users
  FOR SELECT
  TO authenticated
  USING (public.is_staff());

DROP POLICY IF EXISTS "staff select applications" ON public.applications;
CREATE POLICY "staff select applications"
  ON public.applications
  FOR SELECT
  TO authenticated
  USING (public.is_staff());

DROP POLICY IF EXISTS "staff update applications" ON public.applications;
CREATE POLICY "staff update applications"
  ON public.applications
  FOR UPDATE
  TO authenticated
  USING (public.is_staff())
  WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "staff select application history" ON public.application_status_history;
CREATE POLICY "staff select application history"
  ON public.application_status_history
  FOR SELECT
  TO authenticated
  USING (public.is_staff());

-- Lock down legacy job_applications if the table still exists.
DO $$
BEGIN
  IF to_regclass('public.job_applications') IS NOT NULL THEN
    ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;
    REVOKE INSERT, SELECT, UPDATE, DELETE ON public.job_applications FROM anon, authenticated;
    DROP POLICY IF EXISTS "Anyone can submit an application" ON public.job_applications;
    DROP POLICY IF EXISTS "staff select legacy job applications" ON public.job_applications;
    EXECUTE $p$
      CREATE POLICY "staff select legacy job applications"
        ON public.job_applications
        FOR SELECT
        TO authenticated
        USING (public.is_staff())
    $p$;
    GRANT SELECT ON public.job_applications TO authenticated;

    INSERT INTO public.applications (
      id,
      created_at,
      updated_at,
      first_name,
      last_name,
      full_name,
      email,
      linkedin_url,
      phone,
      contact_channel,
      location,
      position_applied_for,
      position_slug,
      portfolio_url,
      resume_storage_path,
      years_of_experience,
      status
    )
    SELECT
      ja.id,
      ja.created_at,
      ja.created_at,
      ja.first_name,
      ja.last_name,
      btrim(concat_ws(' ', ja.first_name, ja.last_name)),
      ja.email,
      ja.linkedin_url,
      NULL,
      ja.whatsapp_tg_disc,
      ja.country,
      ja.job_title,
      ja.job_id,
      NULL,
      ja.resume_url,
      CASE
        WHEN ja.experience ~ '^[0-9]+$' THEN ja.experience::integer
        ELSE NULL
      END,
      'new'::public.application_status
    FROM public.job_applications ja
    ON CONFLICT (id) DO NOTHING;
  END IF;
END
$$;

INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO UPDATE SET public = false;

DROP POLICY IF EXISTS "Anyone can upload a resume" ON storage.objects;

DROP POLICY IF EXISTS "staff read resumes" ON storage.objects;
CREATE POLICY "staff read resumes"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes' AND public.is_staff());

