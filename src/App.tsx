import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Auto-start project preloading at app boot (import triggers module-level preload)
import "@/lib/projectService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";

// Route → dynamic import (same reference for lazy + SSR preload)
const routePreloads: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "/": () => import("./pages/Home"),
  "/diensten": () => import("./pages/Diensten"),
  "/diensten/keuken-wrapping": () => import("./pages/KeukenWrappingDetail"),
  "/diensten/keuken-frontjes": () => import("./pages/KeukenFrontjesDetail"),
  "/diensten/achterwanden": () => import("./pages/AchterwandenDetail"),
  "/diensten/aanrechtbladen": () => import("./pages/AanrechtbladenDetail"),
  "/diensten/kasten": () => import("./pages/KastenDetail"),
  "/diensten/deuren": () => import("./pages/DeurenDetail"),
  "/diensten/kozijnen": () => import("./pages/KozijnenDetail"),
  "/diensten/schadeherstel": () => import("./pages/SchadeherstelDetail"),
  "/projecten": () => import("./pages/Projecten"),
  "/contact": () => import("./pages/Contact"),
  "/over-ons": () => import("./pages/OverOns"),
  "/configurator": () => import("./pages/Configurator"),
  "/catalogus": () => import("./pages/Catalogus"),
  "/privacy-policy": () => import("./pages/PrivacyPolicy"),
  "/algemene-voorwaarden": () => import("./pages/AlgemeneVoorwaarden"),
};

const Home = lazy(routePreloads["/"]);
const Diensten = lazy(routePreloads["/diensten"]);
const KeukenWrappingDetail = lazy(routePreloads["/diensten/keuken-wrapping"]);
const KeukenFrontjesDetail = lazy(routePreloads["/diensten/keuken-frontjes"]);
const AchterwandenDetail = lazy(routePreloads["/diensten/achterwanden"]);
const AanrechtbladenDetail = lazy(routePreloads["/diensten/aanrechtbladen"]);
const KastenDetail = lazy(routePreloads["/diensten/kasten"]);
const DeurenDetail = lazy(routePreloads["/diensten/deuren"]);
const KozijnenDetail = lazy(routePreloads["/diensten/kozijnen"]);
const SchadeherstelDetail = lazy(routePreloads["/diensten/schadeherstel"]);
const Projecten = lazy(routePreloads["/projecten"]);
const Contact = lazy(routePreloads["/contact"]);
const OverOns = lazy(routePreloads["/over-ons"]);
const Configurator = lazy(routePreloads["/configurator"]);
const Catalogus = lazy(routePreloads["/catalogus"]);
const PrivacyPolicy = lazy(routePreloads["/privacy-policy"]);
const AlgemeneVoorwaarden = lazy(routePreloads["/algemene-voorwaarden"]);

/** Used by entry-server to preload the page for a route before SSR render */
export function getPreloadForRoute(route: string): (() => Promise<unknown>) | undefined {
  const normalized = route.replace(/\/+$/, "") || "/";
  return routePreloads[normalized];
}

// Scroll to top on route change


/**
 * AppContent — the router-agnostic inner shell.
 * Exported so entry-server.tsx can wrap it with StaticRouter for SSG,
 * while the default export wraps it with BrowserRouter for the client.
 */
export function AppContent() {
  return (
    <>
      {typeof window !== 'undefined' && <SmoothScroll />}
      <div className="bg-background-light text-dark min-h-screen selection:bg-secondary selection:text-white transition-colors duration-300">
        <Header />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diensten" element={<Diensten />} />
            <Route path="/diensten/keuken-wrapping" element={<KeukenWrappingDetail />} />
            <Route path="/diensten/keuken-frontjes" element={<KeukenFrontjesDetail />} />
            <Route path="/diensten/achterwanden" element={<AchterwandenDetail />} />
            <Route path="/diensten/aanrechtbladen" element={<AanrechtbladenDetail />} />
            <Route path="/diensten/kasten" element={<KastenDetail />} />
            <Route path="/diensten/deuren" element={<DeurenDetail />} />
            <Route path="/diensten/kozijnen" element={<KozijnenDetail />} />
            <Route path="/diensten/schadeherstel" element={<SchadeherstelDetail />} />
            <Route path="/projecten" element={<Projecten />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/configurator" element={<Configurator />} />
            <Route path="/catalogus" element={<Catalogus />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
