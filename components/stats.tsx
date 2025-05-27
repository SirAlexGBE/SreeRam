"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {Users, Award, Globe2, Laptop2} from "lucide-react";

const ICONS_MAP: Record<string, any> = {
  users: Users,
  award: Award,
  globe: Globe2,
  laptop: Laptop2,
};

export default function Stats() {
  const [stats, setStats] = useState<{id: number; Icon: string; value: string; label: string}[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`);
        const data = await response.json();
        setStats(data); // Expecting an array of { id, icon, value, label }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({id, Icon, value, label}, index) => {
            const IconComponent = ICONS_MAP[Icon] || Users; // Default to Users icon if unknown
            return (
              <motion.div key={id} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6, delay: index * 0.1}} className="text-center">
                <div className="flex justify-center mb-4">
                  <IconComponent className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{value}</div>
                <div className="text-sm md:text-base opacity-90">{label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
