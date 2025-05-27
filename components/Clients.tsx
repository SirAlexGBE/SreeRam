"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import Image from "next/image";

interface Client {
  id: number;
  name: string;
  logo: string;
  alt?: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/clients`);
        const data = await response.json();
        setClients(data); // Expecting an array of { id, name, logo, alt? }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
      setClients([
        {
          id: 1,
          name: "ismt college",
          logo: "https://ismt.edu.np/Frontend/assets/images/logos/logo-sunderland.png",
          alt: "ISMT College logo",
        },
      ]);
    };

    fetchClients();
  }, []);

  return (
    <section className="py-20 ">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Trusted Clients</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We're proud to work with industry leaders and innovative companies worldwide.</p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.6, delay: 0.2}}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{opacity: 0, y: 20}}
              animate={inView ? {opacity: 1, y: 0} : {}}
              transition={{duration: 0.6, delay: index * 0.1}}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group"
            >
              <div className="relative w-full h-16 grayscale group-hover:grayscale-0 transition-all duration-300">
                <Image src={client.logo} alt={client.alt || `${client.name} logo`} fill className="object-contain" sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
