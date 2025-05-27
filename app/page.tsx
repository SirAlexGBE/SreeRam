"use client";

import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import Hero from "@/components/hero";
import Services from "@/components/services";
import About from "@/components/about";
import Portfolio from "@/components/portfolio";
import Contact from "@/components/contact";
import Stats from "@/components/stats";
import Team from "@/components/team";
import JobBoard from "@/components/job";
import {FaWhatsapp} from "react-icons/fa";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="overflow-hidden relative">
      <Hero />
      <Services />
      <About />
      <Stats />
      <Portfolio />
      <Clients />
      <Testimonials />
      {/* <Team /> */}
      <JobBoard />
      <Contact />
      <FAQ />
      <Link
        href="https://wa.me/9765656186"
        target="_blank"
        className="fixed bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Contact us on WhatsApp"
      >
        <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} className="relative">
          <FaWhatsapp size={24} />
          <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs p-1 rounded opacity-0 hover:opacity-100 transition-opacity">WhatsApp</span>
        </motion.div>
      </Link>
    </div>
  );
}
