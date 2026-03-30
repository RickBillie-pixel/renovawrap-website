import { useState, useEffect } from "react";
import AfzuigkappenDesktop from "./AfzuigkappenDesktop";
import AfzuigkappenMobile from "./AfzuigkappenMobile";

export default function AfzuigkappenDetail() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <AfzuigkappenMobile /> : <AfzuigkappenDesktop />;
}
