/**
 * Single source of truth for main navigation — used for schema and footer alignment.
 * Does not add new links; reflects existing header nav for consistency.
 */

export const BASE_URL = "https://renovawrap.nl";

/** Main nav: same order as header. Optional footerLabel preserves existing footer text. */
export const MAIN_NAV: ReadonlyArray<{ href: string; label: string; footerLabel?: string }> = [
  { href: "/", label: "Home" },
  { href: "/diensten", label: "Diensten" },
  { href: "/catalogus", label: "Kleuren" },
  { href: "/over-ons", label: "Over ons", footerLabel: "Over Ons" },
  { href: "/projecten", label: "Projecten" },
  { href: "/configurator", label: "Configurator" },
  { href: "/contact", label: "Contact" },
];

/** Services sub-nav: same order/labels as footer "Onze Diensten" (single source of truth). */
export const SERVICES_NAV: ReadonlyArray<{ label: string; href: string }> = [
  // Keuken
  { label: "Keuken Wrappen", href: "/diensten/keuken-wrapping" },
  { label: "Keuken Frontjes Wrappen", href: "/diensten/keuken-frontjes" },
  { label: "Aanrechtbladen Wrappen", href: "/diensten/aanrechtbladen" },
  { label: "Achterwanden Wrappen", href: "/diensten/achterwanden" },
  { label: "Afzuigkap Wrappen", href: "/diensten/afzuigkappen" },
  { label: "Schadeherstel", href: "/diensten/schadeherstel" },
  
  // Interieur
  { label: "Inbouwkasten Wrappen", href: "/diensten/kasten" },
  { label: "Deuren Wrappen", href: "/diensten/deuren" },
  { label: "Kozijnen Wrappen", href: "/diensten/kozijnen" },
  { label: "Vensterbanken Wrappen", href: "/diensten/vensterbanken" },
];
