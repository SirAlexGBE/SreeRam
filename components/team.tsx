"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Team() {
  const [team, setTeam] = useState<any[]>([]) // State to store team data
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  // Fetch team data when the component mounts
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/team`)
        const data = await response.json()
        setTeam(data) // Assuming the data is an array of team members
      } catch (error) {
        console.error("Error fetching team data:", error)
      }
    }

    fetchTeam()
  }, [])

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our diverse team of experts brings together years of experience and innovation
            to deliver exceptional technology solutions.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-2">{member.role}</p>
              <p className="text-muted-foreground mb-4">{member.bio}</p>
              <div className="flex space-x-3">
                <a className="button-ghost icon-button" href={member.linkedin} target="_blank">
                  <Linkedin className="h-5 w-5" />
                </a>
              
                <a className="button-ghost icon-button" href={member.github} target="_blank">
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
