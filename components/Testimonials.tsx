"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {Star, Quote} from "lucide-react";
import {Card, CardContent} from "@/components/ui/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import Link from "next/link";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  verified?: boolean;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/testimonials`);
        const data = await response.json();
        setTestimonials(data); // Expecting an array of testimonial objects
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        // Fallback data for demonstration
        setTestimonials([
          {
            id: 1,
            name: "Priya Sharma",
            position: "Project Manager",
            company: "TechNova Solutions",
            content: "Working with this team was a fantastic experience. They delivered on time and exceeded our expectations.",
            rating: 5,
            avatar: "",
            verified: true,
          },
          {
            id: 2,
            name: "Rahul Kumar",
            position: "CEO",
            company: "Intelzy Software Solutions",
            content: "Professional, reliable, and highly skilled. I would recommend them to anyone looking for quality work.",
            rating: 4,
            avatar:
              "https://scontent.fktm18-1.fna.fbcdn.net/v/t39.30808-6/474625485_1145653030530026_1658290607119435578_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHKJSWxR66KZShgScPfAi_wgVWLfx4KGTWBVYt_HgoZNSKxKVHF1_uBZTkqM92jBN5DFRlwqIW90wUWERNDWaMT&_nc_ohc=DzWhapHj0W4Q7kNvwEwJika&_nc_oc=AdlVCNKLyUtjlcwsLTqsHZmv5FX8VXlassn9UllN9UkwqILDDueKYAz-POhHf7I8zh8&_nc_zt=23&_nc_ht=scontent.fktm18-1.fna&_nc_gid=8POff378XEBTwNkGKECK3A&oh=00_AfL4kxqc41AiBSoDSSekO71rfbZVaWuKDJI7tRytZ8FKuA&oe=683B2810",
            verified: false,
          },
          {
            id: 3,
            name: "Ananya Rao",
            position: "CEO",
            company: "BrightFuture Inc.",
            content: "Their attention to detail and commitment to client satisfaction is unmatched.",
            rating: 5,
            avatar: "",
            verified: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({length: 5}).map((_, index) => <Star key={index} className={`h-4 w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} />);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it. Here's what our satisfied clients have to say about working with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({length: 6}).map((_, index) => (
              <Card key={index} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {Array.from({length: 5}).map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="space-y-1">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-3 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Don't just take our word for it. Here's what our satisfied clients have to say about working with us.</p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{opacity: 0, y: 20}}
          animate={inView ? {opacity: 1, y: 0} : {}}
          transition={{duration: 0.6, delay: 0.2}}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={testimonial.id} initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6, delay: index * 0.1}}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 opacity-10">
                    <Quote className="h-8 w-8" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">{renderStars(testimonial.rating)}</div>

                  {/* Testimonial Content */}
                  <blockquote className="text-foreground mb-6 leading-relaxed">"{testimonial.content}"</blockquote>

                  {/* Author Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={`${testimonial.name} avatar`} />
                      <AvatarFallback className="bg-primary text-primary-foreground">{getInitials(testimonial.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="font-semibold text-foreground truncate">{testimonial.name}</p>
                        {testimonial.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {testimonial.position} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {testimonials.length === 0 && !loading && (
          <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="text-center py-12">
            <p className="text-muted-foreground">No testimonials found.</p>
          </motion.div>
        )}

        {/* Call to Action */}
        {testimonials.length > 0 && (
          <motion.div initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6, delay: 0.4}} className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Ready to join our satisfied clients?</p>
            <Link href="#contact">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors duration-300">Get Started Today</button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
