-- Als de submissions-tabel al bestond (bestaande configurator): voeg image_url en result_url toe voor ERP.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'submissions') THEN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'submissions' AND column_name = 'image_url') THEN
      ALTER TABLE public.submissions ADD COLUMN image_url text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'submissions' AND column_name = 'result_url') THEN
      ALTER TABLE public.submissions ADD COLUMN result_url text;
    END IF;
  END IF;
END $$;
