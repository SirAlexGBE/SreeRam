"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {CheckCircle2} from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

export default function About() {
  const [achievements, setAchievements] = useState<{id: number; title: string}[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/achievements`);
        const data = await response.json();
        setAchievements(data); // Expecting an array of { id, title }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section id="about" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div ref={ref} initial={{opacity: 0, x: -50}} animate={inView ? {opacity: 1, x: 0} : {}} transition={{duration: 0.6}}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pioneering Technology Solutions for Tomorrow</h2>
            <p className="text-lg text-muted-foreground mb-8">
              At ShreeRam IT Solutions, we combine innovation with expertise to deliver cutting-edge technology solutions that transform businesses. Our commitment to excellence and customer
              satisfaction has made us a trusted partner for organizations worldwide.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map(({id, title}, index) => (
                <motion.div key={id} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6, delay: index * 0.1}} className="flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <span>{title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, x: 50}} animate={inView ? {opacity: 1, x: 0} : {}} transition={{duration: 0.6}} className="relative">
            <div className="aspect-video rounded-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Modern office space"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
            <div className="absolute inset-0 bg-primary/20 rounded-xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
