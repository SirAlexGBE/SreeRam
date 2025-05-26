"use client";

import {useState, useEffect} from "react";
import {motion, useScroll} from "framer-motion";
import {Moon, Sun, Menu, X, CircuitBoard} from "lucide-react";
import {useTheme} from "next-themes";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");
  const {theme, setTheme} = useTheme();
  const {scrollY} = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["#services", "#about", "#portfolio", "#contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.querySelector(section) as HTMLElement;
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("/");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {name: "Home", href: "/"},
    {name: "Services", href: "#services"},
    {name: "About", href: "#about"},
    {name: "Portfolio", href: "#portfolio"},
    {name: "Contact", href: "#contact"},
  ];

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-lg" : "bg-transparent"}`}
      initial={{y: -100}}
      animate={{y: 0}}
      transition={{duration: 0.5}}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <CircuitBoard className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ShreeRam IT Solutions</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-foreground/70 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors relative ${activeSection === item.href ? "text-foreground" : ""}`}
                >
                  {item.name}
                  {activeSection === item.href && (
                    <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" layoutId="underline" initial={false} transition={{type: "spring", stiffness: 500, damping: 30}} />
                  )}
                </Link>
              ))}
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div className="md:hidden" initial={{opacity: 0, y: -20}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -20}} transition={{duration: 0.2}}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/80 backdrop-blur-md">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-foreground/70 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium relative ${
                  activeSection === item.href ? "text-foreground border-l-2 border-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
