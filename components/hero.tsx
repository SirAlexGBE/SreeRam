"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {ArrowRight, Code2, Cloud, Database, LucideIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Cloud,
  Database,
};

interface Service {
  icon: string;
  title: string;
  description: string;
  is_featured: boolean;
}

const blobVariants = {
  animate: {
    scale: [1, 1.15, 1],
    rotate: [0, 15, -15, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
    },
  },
};

export default function Hero() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/services`);
        const data: Service[] = await response.json();
        const featuredServices = data.filter((service) => service.is_featured);
        setServices(featuredServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Animated Background Blobs */}
      <motion.div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl z-0" variants={blobVariants} animate="animate" />
      <motion.div
        className="absolute bottom-[-120px] right-[-120px] w-[500px] h-[500px] bg-purple-400/20 dark:bg-purple-500/20 rounded-full blur-3xl z-0"
        variants={blobVariants}
        animate="animate"
        transition={{delay: 2}}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-cyan-400/15 dark:bg-cyan-500/15 rounded-full blur-3xl z-0"
        style={{transform: "translate(-50%, -50%)"}}
        variants={blobVariants}
        animate="animate"
        transition={{delay: 4}}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6}} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Transforming Ideas into
            <br />
            Digital Reality
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            ShreeRam IT Solutions delivers cutting-edge technology solutions that drive innovation and business growth in the digital age.
          </p>
        </motion.div>

        <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.2}} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code2;
            return (
              <motion.div key={index} whileHover={{scale: 1.05}} className="p-6 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 flex flex-col items-center">
                <IconComponent className="h-10 w-10 mx-auto text-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-center">{service.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="flex justify-center">
          <a
            href="#portfolio"
            className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center"
          >
            Get Started
            <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
