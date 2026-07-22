
CREATE TABLE public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id text NOT NULL,
  job_title text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  whatsapp_tg_disc text NOT NULL,
  linkedin_url text,
  country text,
  resume_url text,
  experience text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.job_applications TO anon, authenticated;
GRANT ALL ON public.job_applications TO service_role;

ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application"
  ON public.job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
