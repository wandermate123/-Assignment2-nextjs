import { Github, Mail, MapPin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Student Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Student Information</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <span className="font-medium">Name:</span>
                <span className="ml-2">Your Name</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium">Student Number:</span>
                <span className="ml-2">12345678</span>
              </p>
              <p className="flex items-center">
                <span className="font-medium">Date:</span>
                <span className="ml-2">{currentYear}</span>
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>student@students.latrobe.edu.au</span>
              </p>
              <p className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>La Trobe University</span>
              </p>
              <p className="flex items-center">
                <Github className="w-4 h-4 mr-2" />
                <a 
                  href="https://github.com/student" 
                  className="hover:text-blue-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Profile
                </a>
              </p>
            </div>
          </div>

          {/* Assignment Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Assignment</h3>
            <div className="space-y-2">
              <p>Subject: CSE3CWA/CSE5006</p>
              <p>Assignment: 2</p>
              <p>Technology: Next.js, Docker, Prisma/Sequelize</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {currentYear} Your Name (12345678). All rights reserved. 
            This project is part of CSE3CWA/CSE5006 Assignment 2.
          </p>
        </div>
      </div>
    </footer>
  )
}
