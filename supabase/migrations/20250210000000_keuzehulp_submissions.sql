-- Keuzehulp / wizard submissions voor alle dienstenpagina's.
-- Elke dienst (keuken-wrapping, aanrechtbladen, kozijnen, deuren, kasten, etc.)
-- krijgt een wizard; resultaten komen hier voor weergave in het ERP.

CREATE TABLE IF NOT EXISTS public.keuzehulp_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  -- Welke dienst (slug uit URL); filter in ERP op dit veld
  service_slug text NOT NULL CHECK (service_slug IN (
    'keuken-wrapping', 'aanrechtbladen', 'kasten', 'kozijnen', 'deuren',
    'keuken-frontjes', 'achterwanden', 'schadeherstel'
  )),

  -- Contact (verplicht voor ERP)
  contact_name text,
  contact_email text NOT NULL,
  contact_phone text,
  contact_address text,

  -- Alle wizard-stappen/antwoorden (flexibel per dienst)
  wizard_data jsonb NOT NULL DEFAULT '{}',

  -- Foto-URLs na upload naar storage (apart voor ERP-weergave)
  foto_urls text[] DEFAULT '{}',

  -- ERP workflow
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'offer_sent', 'accepted', 'rejected', 'archived')),
  notes text,

  -- Optioneel: referentie naar AI-configurator submission (submissions-table beheerd door bestaande configurator)
  configurator_submission_id uuid
);

-- Indexen voor ERP: filter op status, op dienst-type, en combinatie voor "per type"
CREATE INDEX IF NOT EXISTS idx_keuzehulp_submissions_status ON public.keuzehulp_submissions (status);
CREATE INDEX IF NOT EXISTS idx_keuzehulp_submissions_service ON public.keuzehulp_submissions (service_slug);
CREATE INDEX IF NOT EXISTS idx_keuzehulp_submissions_created ON public.keuzehulp_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_keuzehulp_submissions_service_status ON public.keuzehulp_submissions (service_slug, status);
CREATE INDEX IF NOT EXISTS idx_keuzehulp_submissions_service_created ON public.keuzehulp_submissions (service_slug, created_at DESC);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS keuzehulp_submissions_updated_at ON public.keuzehulp_submissions;
CREATE TRIGGER keuzehulp_submissions_updated_at
  BEFORE UPDATE ON public.keuzehulp_submissions
  FOR EACH ROW EXECUTE PROCEDURE public.set_updated_at();

-- RLS: anon/authenticated mogen inserten (formulier); select/update alleen voor service role of later eigen policies
ALTER TABLE public.keuzehulp_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert for submissions" ON public.keuzehulp_submissions;
CREATE POLICY "Allow insert for submissions"
  ON public.keuzehulp_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select for service role (ERP)" ON public.keuzehulp_submissions;
CREATE POLICY "Allow select for service role (ERP)"
  ON public.keuzehulp_submissions FOR SELECT
  TO service_role
  USING (true);

DROP POLICY IF EXISTS "Allow update for service role (ERP)" ON public.keuzehulp_submissions;
CREATE POLICY "Allow update for service role (ERP)"
  ON public.keuzehulp_submissions FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.keuzehulp_submissions IS 'Keuzehulp/wizard resultaten van alle dienstenpagina''s voor ERP. Filter op service_slug voor per-type (keuken-wrapping, aanrechtbladen, …). Contact in contact_*; alle wizardvelden in wizard_data.';
