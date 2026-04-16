"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function ChairmanPitch() {
  return (
    <section className="chairman-pitch section" id="chairman">
      <div className="container">
        <div className="chairman-grid">
          <motion.div 
            className="chairman-image-container"
            initial={{ opacity: 0, scale: 0.9, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="portrait-frame">
              <Image 
                src="/board/yadukso-white.png" 
                alt="Dr. Amos Gizo Yadukso - Chairman of the Governing Board"
                width={700}
                height={800}
                className="chairman-portrait"
                priority
              />
              <div className="portrait-overlay" />
              <div className="portrait-badge">
                <span className="chairman-name">Dr. Amos Gizo Yadukso</span>
                <span className="chairman-role">Chairman, Governing Board</span>
              </div>
            </div>
            <div className="frame-decoration" />
          </motion.div>

          <motion.div 
            className="chairman-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="section-badge">
              <span className="badge-dot" />
              Chairman&apos;s Golden Jubilee Message
            </div>
            <h2 className="section-title" style={{ fontFamily: "var(--font-playfair), serif" }}>
              A Legacy of Resilience, <br />
              A Future of <span className="highlight">Strategic Growth</span>
            </h2>
            <div className="gold-divider" style={{ margin: "1.5rem 0 2.5rem 0" }} />
            
            <div className="pitch-text">
              <p className="pitch-intro">
                &ldquo;Fifty years ago, a vision was planted in the fertile soils of the Lower Benue River Basin. Today, as we celebrate our <strong>Golden Jubilee</strong>, we are not just looking back at five decades of service; we are aggressively repositioning for a future of unprecedented impact.&rdquo;
              </p>
              
              <div className="pitch-body">
                <p>
                  Under the <strong>Renewed Hope Agenda</strong>, the LBRBDA is transitioning from a traditional oversight authority into a high-performance engine of <strong>Middle-Belt economic transformation</strong>. Our mandate is clear: to deliver food security, create sustainable jobs, and drive climate-resilient growth across Benue, Nasarawa, Plateau, and Kogi states.
                </p>
                <p>
                  We are building more than irrigation infrastructure; we are constructing a <strong>Climate-Smart Agricultural Corridor</strong> that will attract global finance and cement Nigeria&apos;s position as the agricultural powerhouse of Africa. The next 50 years of development and resilience begin now.
                </p>
              </div>
            </div>
            
            <motion.div 
              className="chairman-signature"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 1 }}
            >
              <div className="signature-accent" />
              <p className="signature-quote">Leading with Resilience, Developing with Purpose.</p>
              <div className="chairman-meta">
                <strong>Dr. Amos Gizo Yadukso</strong>
                <span>Executive Chairman, LBRBDA Governing Board</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="pitch-bg-glow" />
      <div className="pitch-pattern" />
    </section>
  );
}
