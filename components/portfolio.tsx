"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";

export default function Portfolio() {
  const [projects, setProjects] = useState<any[]>([]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/projects`);
        const data = await response.json();
        setProjects(data); // Assuming the data is an array of projects
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our successful projects and innovative solutions that have helped businesses transform and grow.</p>
        </motion.div>

        <motion.div ref={ref} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6, delay: index * 0.1}}>
              <a href={project.link} target="_blank" rel="noopener noreferrer">
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={project.image} alt={project.title} className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"></div>
                  </div>
                  <CardHeader>
                    <div className="text-sm text-primary mb-2">{project.category}</div>
                    <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
