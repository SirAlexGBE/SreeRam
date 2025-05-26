"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {Card, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import {ChevronDown, ChevronUp} from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/faqs`);
        const data = await response.json();
        setFaqs(data); // Assuming the data is an array of FAQ items
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        // Fallback data for demonstration
        setFaqs([
          {
            id: 1,
            question: "What services do you offer?",
            answer:
              "We offer a comprehensive range of digital services including web development, mobile app development, UI/UX design, and digital marketing solutions tailored to your business needs.",
            category: "Services",
          },
          {
            id: 2,
            question: "How long does a typical project take?",
            answer:
              "Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation.",
            category: "Timeline",
          },
          {
            id: 3,
            question: "Do you provide ongoing support?",
            answer:
              "Yes, we offer comprehensive post-launch support including maintenance, updates, bug fixes, and technical assistance. We have various support packages to suit different needs and budgets.",
            category: "Support",
          },
          {
            id: 4,
            question: "What technologies do you work with?",
            answer: "We work with modern technologies including React, Next.js, Node.js, Python, AWS, and many others. Our team stays updated with the latest industry trends and best practices.",
            category: "Technology",
          },
          {
            id: 5,
            question: "How do you handle project communication?",
            answer:
              "We maintain transparent communication through regular updates, progress reports, and dedicated project managers. We use tools like Slack, email, and video calls to keep you informed throughout the process.",
            category: "Communication",
          },
          {
            id: 6,
            question: "What are your pricing models?",
            answer:
              "We offer flexible pricing models including fixed-price projects, hourly rates, and retainer agreements. Pricing depends on project scope, complexity, and timeline. We provide detailed quotes after understanding your requirements.",
            category: "Pricing",
          },
        ]);
      }
    };

    fetchFAQs();
  }, []);

  const toggleExpand = (id: number) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(id)) {
      newExpandedItems.delete(id);
    } else {
      newExpandedItems.add(id);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Find answers to common questions about our services, processes, and how we can help your business succeed.</p>
        </motion.div>

        <motion.div ref={ref} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div key={faq.id} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6, delay: index * 0.1}}>
              <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg">
                <CardHeader onClick={() => toggleExpand(faq.id)} className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {faq.category && <div className="text-sm text-primary mb-2 font-medium">{faq.category}</div>}
                      <CardTitle className="text-lg mb-2 text-left leading-relaxed">{faq.question}</CardTitle>
                    </div>
                    <div className="flex-shrink-0 mt-1">{expandedItems.has(faq.id) ? <ChevronUp className="h-5 w-5 text-primary" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}</div>
                  </div>

                  <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{
                      height: expandedItems.has(faq.id) ? "auto" : 0,
                      opacity: expandedItems.has(faq.id) ? 1 : 0,
                    }}
                    transition={{duration: 0.3, ease: "easeInOut"}}
                    className="overflow-hidden"
                  >
                    {expandedItems.has(faq.id) && <CardDescription className="pt-3 text-left leading-relaxed">{faq.answer}</CardDescription>}
                  </motion.div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
