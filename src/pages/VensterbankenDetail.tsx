import { useState, useEffect } from "react";
import VensterbankenDesktop from "./VensterbankenDesktop";
import VensterbankenMobile from "./VensterbankenMobile";

export default function VensterbankenDetail() {
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

  return isMobile ? <VensterbankenMobile /> : <VensterbankenDesktop />;
}
