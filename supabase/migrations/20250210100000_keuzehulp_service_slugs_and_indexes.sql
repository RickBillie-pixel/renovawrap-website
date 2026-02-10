-- Ondersteunde keuzehulp-categorieën (filter per type in ERP).
-- Elke dienstenpagina gebruikt exact deze slug; alle velden per wizard in wizard_data + contact_*.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'keuzehulp_submissions_service_slug_check'
  ) THEN
    ALTER TABLE public.keuzehulp_submissions
    ADD CONSTRAINT keuzehulp_submissions_service_slug_check
    CHECK (service_slug IN (
      'keuken-wrapping',
      'aanrechtbladen',
      'kasten',
      'kozijnen',
      'deuren',
      'keuken-frontjes',
      'achterwanden',
      'schadeherstel'
    ));
  END IF;
END $$;

-- (Indexen service_slug+status en service_slug+created_at staan in de eerste migration.)

COMMENT ON COLUMN public.keuzehulp_submissions.service_slug IS
  'Dienst-categorie voor filter in ERP. Waarden: keuken-wrapping, aanrechtbladen, kasten, kozijnen, deuren, keuken-frontjes, achterwanden, schadeherstel';
