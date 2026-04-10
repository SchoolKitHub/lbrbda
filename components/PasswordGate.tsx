"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

/* ============================================
   PasswordGate Component
   ============================================
   A security gate for the platform that prevents 
   unauthorized access to classified documents.
   ============================================ */

const AUTHORIZATION_CODE = "21897662";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if user was previously authorized in this session
    const authorized = sessionStorage.getItem("lbrbda_authorized");
    if (authorized === "true") {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === AUTHORIZATION_CODE) {
      setIsAuthorized(true);
      sessionStorage.setItem("lbrbda_authorized", "true");
      setError(false);
    } else {
      setError(true);
      // Reset error after a shake animation duration
      setTimeout(() => setError(false), 500);
    }
  };

  if (isAuthorized === null) return null; // Prevent flicker

  return (
    <>
      <AnimatePresence>
        {!isAuthorized && (
          <motion.div
            className="password-gate-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <div className="gate-container">
              <motion.div 
                className="gate-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <Image
                  src="/nigeria-coat-of-arms.png"
                  alt="Nigeria Coat of Arms"
                  width={250}
                  height={200}
                  priority
                  className="gate-coat-of-arms"
                />
              </motion.div>

              <motion.div
                className="gate-status"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h1 className="classified-stamp">CLASSIFIED</h1>
                <p className="gate-warning">AUTHORIZATION REQUIRED</p>
                <p className="gate-subtext">This platform contains strategic national agricultural and water infrastructure assets. Unauthorised access is prohibited.</p>
              </motion.div>

              <motion.form
                className={`gate-form ${error ? "shake" : ""}`}
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="input-group">
                  <input
                    type="password"
                    placeholder="ENTER ACCESS CODE"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="gate-input"
                    autoFocus
                  />
                  <button type="submit" className="gate-submit">
                    VERIFY →
                  </button>
                </div>
                {error && <p className="error-text">INVALID AUTHORIZATION CODE</p>}
              </motion.form>

              <motion.div 
                className="gate-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.5 }}
              >
                LBRBDA Strategic Mission Control — Golden Jubilee Edition
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={!isAuthorized ? "site-blurred" : "site-visible"}>
        {children}
      </div>
    </>
  );
}
