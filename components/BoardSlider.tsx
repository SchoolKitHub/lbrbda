"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const boardMembers = [
  {
    name: "Dr. Amos Gizo Yadukso",
    title: "Chairman of the Governing Board",
    role: "Advisory/high-level guidance, especially for stakeholder engagement.",
    image: "/board/yadukso-hd.png",
  },
  {
    name: "Engr. Terese Ninga",
    title: "Managing Director",
    role: "Overall oversight and leadership; chief executive ensuring alignment with authority priorities.",
    image: "/board/ninga-hd.png",
  },
  {
    name: "Mr. Sunday Kubba Hassan",
    title: "Executive Director, Planning & Design",
    role: "Strategic planning, institutional design, and development framework coordination.",
    image: "/board/kubba-hd.png",
  },
  {
    name: "Hon. Musa O. Yusuf",
    title: "Executive Director, Finance & Admin",
    role: "Financial oversight, administrative operations, and resource allocation management.",
    image: "/board/yusuf-hd.png",
  },
  {
    name: "Hon. Hassan Omale",
    title: "Executive Director, Agric. Services",
    role: "Lead on agribusiness, climate finance project, youth/women/green development campaigns.",
    image: "/board/omale-hd.png",
  },
  {
    name: "Engr. Timothy Ogomola Okibe",
    title: "Executive Director, Engineering",
    role: "Coordinate overall program structure, activity planning, timeline, and policy dialogue integration.",
    image: "/board/okibe-hd.png",
  },
];

export default function BoardSlider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section board-section" id="board" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            👥 The Management Board
          </motion.div>
          <motion.h2
            className="section-title"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Visionary{" "}
            <span className="highlight">Leadership</span>
          </motion.h2>
          <div className="gold-divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            The leadership driving the 50-year vision — reconstituted in March
            2025 under Presidential approval to deliver transformational impact.
          </motion.p>
        </div>

        <motion.div
          className="board-slider-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            breakpoints={{
              320: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={{ padding: "2rem 0 4rem" }}
          >
            {boardMembers.map((member, i) => (
              <SwiperSlide key={i} style={{ maxWidth: 360 }}>
                <div className="board-slide">
                  <div className="board-portrait">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={220}
                      height={220}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <h3 className="board-name">{member.name}</h3>
                  <p className="board-title">{member.title}</p>
                  <p className="board-role">{member.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
