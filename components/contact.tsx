"use client";

import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Mail, Phone, MapPin} from "lucide-react";
import {useState} from "react";

export default function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({name: "", email: "", subject: "", message: ""});
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while sending your message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background/50">
      <div className="container mx-auto px-4">
        <motion.div initial={{opacity: 0, y: 20}} animate={inView ? {opacity: 1, y: 0} : {}} transition={{duration: 0.6}} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Have a project in mind? Let's discuss how we can help you achieve your goals.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div ref={ref} initial={{opacity: 0, x: -50}} animate={inView ? {opacity: 1, x: 0} : {}} transition={{duration: 0.6}} className="space-y-8">
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                <p className="text-muted-foreground">mediahubshreeram@gmail.com </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                <p className="text-muted-foreground">+977 9765656186</p>
                <p className="text-muted-foreground">+977 9865419130</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                <p className="text-muted-foreground">
                  Bharatpur-12 , Chitwan
                  <br />
                  Nepal - 44200
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{opacity: 0, x: 50}} animate={inView ? {opacity: 1, x: 0} : {}} transition={{duration: 0.6}} className="space-y-6">
            {success && <p className="text-green-500">Your message has been sent successfully!</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" name="name" value={formData.name} onChange={handleInputChange} required />
                <Input type="email" placeholder="Your Email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <Input placeholder="Subject" name="subject" value={formData.subject} onChange={handleInputChange} required />
              <Textarea placeholder="Your Message" name="message" value={formData.message} onChange={handleInputChange} className="min-h-[150px]" required />
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
