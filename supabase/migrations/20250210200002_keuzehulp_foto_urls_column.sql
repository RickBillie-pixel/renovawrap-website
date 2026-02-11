-- Foto-URLs in aparte kolom voor ERP (niet in wizard_data).
ALTER TABLE public.keuzehulp_submissions
  ADD COLUMN IF NOT EXISTS foto_urls text[] DEFAULT '{}';

COMMENT ON COLUMN public.keuzehulp_submissions.foto_urls IS 'URLs van geüploade foto''s (storage) voor weergave in ERP.';
