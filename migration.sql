-- Add style and color columns to the projects table
ALTER TABLE public.projects
ADD COLUMN style text NULL,
ADD COLUMN color text NULL;

-- Optional: specific comment on columns
COMMENT ON COLUMN public.projects.style IS 'Style of the project (e.g., Houtstijl, Modern)';
COMMENT ON COLUMN public.projects.color IS 'Color scheme of the project (e.g., Zwart, Beige)';
