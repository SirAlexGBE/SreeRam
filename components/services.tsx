"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {Code, Cloud, Database, Globe, Shield, Smartphone, Brain, Cpu, LineChart, LucideIcon} from "lucide-react";
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

// Mapping of API icon names to Lucide icons
const iconMap: Record<string, LucideIcon> = {
  Code,
  Cloud,
  Database,
  Globe,
  Shield,
  Smartphone,
  Brain,
  Cpu,
  LineChart,
};

// Define service type
interface Service {
  icon: string;
  title: string;
  description: string;
  is_featured: boolean;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/services`);
        const data: Service[] = await response.json();
        // Keep only non-featured services (is_featured: false)
        const nonFeaturedServices = data.filter((service) => service.is_featured === false);
        setServices(nonFeaturedServices);
      } catch (error) {
        console.error("Error fetching services:", error);
        // Fallback data for demonstration
        setServices([
          {
            icon: "Code",
            title: "Web Development",
            description: "Build modern, responsive websites and web applications tailored to your business needs.",
            is_featured: false,
          },
          {
            icon: "Smartphone",
            title: "Mobile App Development",
            description: "Create high-performance mobile apps for iOS and Android platforms. We Create to fulfill your all needs",
            is_featured: false,
          },
          {
            icon: "Cloud",
            title: "Cloud Solutions",
            description: "Leverage scalable cloud infrastructure and services for your digital transformation.",
            is_featured: false,
          },
        ]);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: {opacity: 0},
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {y: 20, opacity: 0},
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Comprehensive technology solutions tailored to meet your business needs and drive digital transformation.</p>
        </motion.div>

        <motion.div ref={ref} variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
                  {/* Optimized overlay with GPU acceleration */}
                  <span
                    className="pointer-events-none absolute inset-0 z-0 bg-white origin-top scale-y-0 
                       transition-transform duration-300 ease-linear group-hover:scale-y-100 
                       transform-gpu mix-blend-difference"
                  />

                  {/* Content with optimized transitions */}
                  <span className="relative z-10 block transition-[filter] duration-300 group-hover:invert">
                    <CardHeader>
                      <Icon
                        className="h-12 w-12 text-primary mb-4 transition-transform duration-300 
                              group-hover:scale-110"
                      />
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <CardDescription
                        className="text-gray-700 dark:text-gray-300 
                                         transition-colors duration-300"
                      >
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                  </span>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
