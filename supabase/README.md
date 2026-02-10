# Supabase – RenovaWrap website

Configuratie voor lokaal draaien en voor deployment. De **configurator** (AI + bucket `configurator-uploads`) is een bekende, bestaande setup; buckets en eventuele `submissions`-table worden daar beheerd.

## Structuur

| Bestand / map   | Doel |
|-----------------|------|
| `config.toml`   | Projectconfiguratie (API, DB, Auth, Storage). Geen bucket-definities; die bestaan al. |
| `migrations/`    | Alleen **keuzehulp_submissions**: tabel voor wizard/keuzehulp van alle dienstenpagina’s (voor ERP). |
| `seed.sql`      | Optionele seed-data na `supabase db reset`. |
| `.gitignore`    | Negeert `.temp/` en lokale env-bestanden. |

## Tabel: `keuzehulp_submissions`

Elke **dienstenpagina** krijgt een keuzehulp/wizard (zoals bij Keuken Wrapping). De resultaten worden hier opgeslagen zodat het **ERP** ze kan tonen.

- **service_slug** – Welke dienst: `keuken-wrapping`, `aanrechtbladen`, `kozijnen`, `deuren`, `kasten`, `keuken-frontjes`, `achterwanden`, `schadeherstel`.
- **contact_*** – Naam, e-mail, telefoon, adres.
- **wizard_data** (jsonb) – Alle wizard-stappen/antwoorden (flexibel per dienst).
- **status** – Voor ERP-workflow: `new`, `contacted`, `offer_sent`, `accepted`, `rejected`, `archived`.
- **notes** – Interne notities (ERP).

Frontend: na afronden van de wizard `INSERT` in `keuzehulp_submissions` (anon mag inserten). Alle velden: contact_* voor contactgegevens; **wizard_data** voor alle antwoorden van die wizard (elke dienst slaat daar zijn eigen velden in op). ERP leest/update via service role.

**Filteren per type keuzehulp (ERP):** `WHERE service_slug = 'keuken-wrapping'` (of `aanrechtbladen`, `kasten`, …). Indexen op `(service_slug, status)` en `(service_slug, created_at)` voor snelle filters.

## Lokaal draaien

1. [Supabase CLI](https://supabase.com/docs/guides/cli) installeren.
2. In de projectroot: `supabase start`.
3. Migraties en seed: `supabase db reset` (of al bij start).

## Hosted (Supabase Cloud)

- Migraties toepassen: `supabase db push` (of SQL uit `migrations/` in Dashboard → SQL Editor uitvoeren).
- Buckets en configurator bestaan al; geen extra storage-migraties nodig.
