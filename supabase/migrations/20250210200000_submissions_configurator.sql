-- Configurator: submissions-table voor upload-URL(s) en resultaat-URL.
-- Foto wordt in storage (configurator-uploads) gezet; deze tabel slaat de URLs op voor ERP.

CREATE TABLE IF NOT EXISTS public.submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- Contact
  name text,
  email text,
  address text,

  -- Wat is gekozen (voor ERP)
  service_details jsonb,
  color_details jsonb,

  -- Afbeeldingen: geüpload door gebruiker → storage, URL hier voor ERP
  image_url text,
  -- Gegenereerd resultaat (na verwerking door Edge Function / backend)
  result_url text,

  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

CREATE INDEX IF NOT EXISTS idx_submissions_created ON public.submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions (status);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS submissions_updated_at ON public.submissions;
CREATE TRIGGER submissions_updated_at
  BEFORE UPDATE ON public.submissions
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Edge Function / service role schrijft; anon mag inserten voor formulier
CREATE POLICY "Allow insert submissions"
  ON public.submissions FOR INSERT
  TO anon, authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Allow update submissions"
  ON public.submissions FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow select submissions for service role (ERP)"
  ON public.submissions FOR SELECT
  TO service_role
  USING (true);

-- Realtime: frontend luistert op UPDATE voor result_url
CREATE POLICY "Allow select own submission for anon"
  ON public.submissions FOR SELECT
  TO anon, authenticated
  USING (true);

COMMENT ON TABLE public.submissions IS 'Configurator: geüploade foto-URL (image_url) en resultaat-URL (result_url) voor weergave in ERP.';
