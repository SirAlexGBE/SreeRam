"use client"

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Briefcase, ArrowRight, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog'

export default function JobBoard() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [open, setOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<{ title: string; company: string; location: string; type: string; description: string; postedDate: string } | null>(null)
  const [jobs, setJobs] = useState<any[]>([]) // State to store the fetched jobs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    coverLetter: '',
    job_title: '',
    resume: null as File | null, // Ensure resume is stored as a File object
  })

  // Fetch jobs data from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/jobs`)
        if (response.ok) {
          const data = await response.json()
          setJobs(data)
        } else {
          console.error('Failed to fetch jobs')
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }

    fetchJobs()
  }, [])

  const handleApplyClick = (job: { title: string; company: string; location: string; type: string; description: string; postedDate: string }) => {
    setSelectedJob(job)
    setOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        resume: e.target.files ? e.target.files[0] : null, // Store the file object
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!formData.resume) {
      alert('Please upload your resume.')
      return
    }
  
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name)
    formDataToSend.append('email', formData.email)
    formDataToSend.append('cover_letter', formData.coverLetter)
    formDataToSend.append('resume', formData.resume) // Attach the file
    formDataToSend.append('job_title', selectedJob?.title || '')
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/jobs/apply/`, {
        method: 'POST',
        body: formDataToSend, // Send FormData
      })
  
      if (response.ok) {
        alert('Application submitted successfully!')
        setOpen(false) // Close the modal
      } else {
        alert('Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Error submitting application')
    }
  }

  return (
    <section id="jobs" className="py-20 bg-background text-black dark:text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Job Openings</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore exciting career opportunities and internships at leading companies.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer h-full border border-gray-300 dark:border-gray-700 bg-background shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 text-sm mb-2">
                    <span>{job.postedDate}</span>
                    <span className="flex items-center gap-1"><Briefcase className="h-4 w-4" /> {job.type}</span>
                  </div>
                  <CardTitle className="text-xl text-black dark:text-white mb-2">{job.title}</CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400 mb-2">{job.company} - {job.location}</CardDescription>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                  <Button variant="ghost" size="sm" className="group text-black dark:text-white border border-gray-300 dark:border-gray-600" onClick={() => handleApplyClick(job)}>
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Application Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-background border border-gray-300 dark:border-gray-700 text-black dark:text-white p-6 rounded-lg">
          <DialogHeader className="flex justify-between items-center">
            <DialogTitle className="text-xl font-bold">Apply for {selectedJob?.title}</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mb-4">
            Fill out the form below to submit your application.
          </DialogDescription>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your Name"
                className="w-full mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Your Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email"
                className="w-full mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload CV/Resume</label>
              <Input
                id="resume"
                name="resume"
                type="file"
                onChange={handleFileChange}
                className="w-full mt-1"
                required
              />
            </div>
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cover Letter / Message</label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                placeholder="Cover Letter / Message"
                className="w-full mt-1"
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full">Submit Application</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}
