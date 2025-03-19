"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { 
  Code, Cloud, Database, Globe, Shield, Smartphone, 
  Brain, Cpu, LineChart, LucideIcon 
} from "lucide-react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string

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
  LineChart
}

// Define service type
interface Service {
  icon: string
  title: string
  description: string
  is_featured: boolean
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/services`)
        const data: Service[] = await response.json()
        // Keep only non-featured services (is_featured: false)
        const nonFeaturedServices = data.filter((service) => service.is_featured === false)
        setServices(nonFeaturedServices)
      } catch (error) {
        console.error("Error fetching services:", error)
      }
    }

    fetchServices()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions tailored to meet your business needs
            and drive digital transformation.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Code // Default to Code if icon not found
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <Icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
