"use client"

import { motion } from 'framer-motion'
import { CircuitBoard } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <CircuitBoard className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ShreeRam IT Solutions</span>
            </Link>
            <p className="text-muted-foreground">
              Transforming businesses through innovative technology solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Custom Development</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Cloud Solutions</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Data Analytics</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Cybersecurity</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#portfolio" className="text-muted-foreground hover:text-foreground">Portfolio</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {currentYear} ShreeRam IT Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}