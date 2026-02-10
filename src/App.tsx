import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import Materialen from "./pages/Materialen";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
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
          <Route path="/materialen" element={<Materialen />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
