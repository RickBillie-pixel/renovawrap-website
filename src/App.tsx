import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Auto-start project preloading at app boot (import triggers module-level preload)
import "@/lib/projectService";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Diensten from "./pages/Diensten";
import Projecten from "./pages/Projecten";
import Contact from "./pages/Contact";
import OverOns from "./pages/OverOns";
import Configurator from "./pages/Configurator";
import KeukenWrappingDetail from "./pages/KeukenWrappingDetail";
import KeukenFrontjesDetail from "./pages/KeukenFrontjesDetail";
import AchterwandenDetail from "./pages/AchterwandenDetail";
import AanrechtbladenDetail from "./pages/AanrechtbladenDetail";
import KastenDetail from "./pages/KastenDetail";
import DeurenDetail from "./pages/DeurenDetail";
import KozijnenDetail from "./pages/KozijnenDetail";
import SchadeherstelDetail from "./pages/SchadeherstelDetail";
import Catalogus from "./pages/Catalogus";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import AlgemeneVoorwaarden from "./pages/AlgemeneVoorwaarden";

import SmoothScroll from "./components/SmoothScroll";

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
