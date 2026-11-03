
CREATE POLICY "Anyone can upload a resume"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');
