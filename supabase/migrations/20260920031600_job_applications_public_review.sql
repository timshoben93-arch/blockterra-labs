GRANT SELECT, UPDATE, DELETE ON public.job_applications TO anon, authenticated;

CREATE POLICY "Anyone can review applications"
  ON public.job_applications
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update an application"
  ON public.job_applications
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete an application"
  ON public.job_applications
  FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can read a resume"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resumes');

CREATE POLICY "Anyone can replace a resume"
  ON storage.objects
  FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'resumes')
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Anyone can delete a resume"
  ON storage.objects
  FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'resumes');
