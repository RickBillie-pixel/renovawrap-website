/**
 * Single source of truth for main navigation — used for schema and footer alignment.
 * Does not add new links; reflects existing header nav for consistency.
 */

export const BASE_URL = "https://renovawrap.nl";

/** Main nav: same order as header. Optional footerLabel preserves existing footer text. */
export const MAIN_NAV: ReadonlyArray<{ href: string; label: string; footerLabel?: string }> = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/over-ons", label: "Over ons", footerLabel: "Over Ons" },
  { href: "/projecten", label: "Projecten" },
  { href: "/configurator", label: "Configurator" },
  { href: "/contact", label: "Contact" },
];

/** Services sub-nav: same order/labels as footer "Onze Diensten" (single source of truth). */
export const SERVICES_NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Keuken Wrapping", href: "/diensten/keuken-wrapping" },
  { label: "Aanrechtbladen", href: "/diensten/aanrechtbladen" },
  { label: "Inbouwkasten", href: "/diensten/kasten" },
  { label: "Kozijnen", href: "/diensten/kozijnen" },
  { label: "Deuren", href: "/diensten/deuren" },
  { label: "Keuken Frontjes", href: "/diensten/keuken-frontjes" },
  { label: "Achterwanden", href: "/diensten/achterwanden" },
  { label: "Schadeherstel", href: "/diensten/schadeherstel" },
];
