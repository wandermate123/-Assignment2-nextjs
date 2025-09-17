'use client'

import { useState } from 'react'
import { Copy, Download, Play, Settings, Container } from 'lucide-react'

export default function DockerPage() {
  const [dockerfileContent, setDockerfileContent] = useState('')
  const [dockerComposeContent, setDockerComposeContent] = useState('')
  const [selectedOption, setSelectedOption] = useState<'dockerfile' | 'docker-compose'>('dockerfile')

  const generateDockerfile = () => {
    const content = `# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start the application
CMD ["npm", "start"]`
    setDockerfileContent(content)
  }

  const generateDockerCompose = () => {
    const content = `version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/gitautomation
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=gitautomation
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:`
    setDockerComposeContent(content)
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
    alert('Content copied to clipboard!')
  }

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
            <Container className="w-10 h-10 mr-3 text-blue-600" />
            Docker Configuration
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Containerize your Next.js application with Docker
          </p>
        </div>

        {/* Option Selection */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Choose Configuration Type
          </h2>
          
          <div className="flex items-center justify-center space-x-8">
            <button
              onClick={() => setSelectedOption('dockerfile')}
              className={`flex items-center px-6 py-3 rounded-lg border-2 transition-colors ${
                selectedOption === 'dockerfile'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <Container className="w-6 h-6 mr-2" />
              Dockerfile
            </button>

            <button
              onClick={() => setSelectedOption('docker-compose')}
              className={`flex items-center px-6 py-3 rounded-lg border-2 transition-colors ${
                selectedOption === 'docker-compose'
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                  : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500'
              }`}
            >
              <Settings className="w-6 h-6 mr-2" />
              Docker Compose
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Generator */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {selectedOption === 'dockerfile' ? 'Dockerfile Generator' : 'Docker Compose Generator'}
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {selectedOption === 'dockerfile' 
                    ? 'Generate a production-ready Dockerfile for your Next.js application with Prisma support.'
                    : 'Generate a complete docker-compose.yml with database and Redis services.'
                  }
                </p>
                
                <button
                  onClick={selectedOption === 'dockerfile' ? generateDockerfile : generateDockerCompose}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Generate {selectedOption === 'dockerfile' ? 'Dockerfile' : 'Docker Compose'}
                </button>
              </div>

              {/* Generated Content */}
              {(selectedOption === 'dockerfile' ? dockerfileContent : dockerComposeContent) && (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyToClipboard(selectedOption === 'dockerfile' ? dockerfileContent : dockerComposeContent)}
                      className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                    <button
                      onClick={() => downloadFile(
                        selectedOption === 'dockerfile' ? dockerfileContent : dockerComposeContent,
                        selectedOption === 'dockerfile' ? 'Dockerfile' : 'docker-compose.yml'
                      )}
                      className="flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generated Configuration */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Generated Configuration
            </h2>

            {selectedOption === 'dockerfile' ? (
              dockerfileContent ? (
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto max-h-96">
                  <pre>{dockerfileContent}</pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Container className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generate a Dockerfile to see it here</p>
                </div>
              )
            ) : (
              dockerComposeContent ? (
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto max-h-96">
                  <pre>{dockerComposeContent}</pre>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Generate docker-compose.yml to see it here</p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Docker Commands */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Docker Commands
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Build and Run
              </h3>
              <div className="space-y-2">
                <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm">
                  <div>$ docker build -t git-automation-app .</div>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm">
                  <div>$ docker run -p 3000:3000 git-automation-app</div>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm">
                  <div>$ docker-compose up -d</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Management
              </h3>
              <div className="space-y-2">
                <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm">
                  <div>$ docker ps</div>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm">
                  <div>$ docker logs git-automation-app</div>
                </div>
                <div className="bg-gray-900 text-green-400 p-3 rounded-md font-mono text-sm">
                  <div>$ docker-compose down</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Container className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Containerization
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Package your application in a portable container
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Play className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Easy Deployment
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Deploy anywhere Docker is supported
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <Settings className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Multi-Service
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Orchestrate multiple services with Docker Compose
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
