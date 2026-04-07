"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function OrientationBarrier() {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // Show barrier if device is mobile/tablet width AND in portrait
      const mobileWidth = window.innerWidth <= 1024;
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(mobileWidth && portrait);
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    window.addEventListener("orientationchange", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, []);

  return (
    <AnimatePresence>
      {isPortrait && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="orientation-barrier"
        >
          <div className="orientation-content">
            <motion.div
              animate={{ rotate: 90 }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
              className="orientation-icon"
            >
              📱
            </motion.div>
            <h2 className="orientation-title">Landscape Mode Recommended</h2>
            <p className="orientation-text">
              For the best immersive experience of the LBRBDA Golden Jubilee, please
              rotate your device to landscape.
            </p>
            <div className="orientation-visual">
              <div className="phone-outline portrait"></div>
              <div className="arrow-rotate">🔄</div>
              <div className="phone-outline landscape"></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
