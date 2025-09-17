'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTheme } from './ThemeProvider'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import Cookies from 'js-cookie'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const { theme, setTheme, actualTheme } = useTheme()

  useEffect(() => {
    // Load active tab from cookies
    const savedTab = Cookies.get('activeTab')
    if (savedTab) {
      setActiveTab(savedTab)
    }
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    setIsMenuOpen(false)
    // Save active tab to cookies
    Cookies.set('activeTab', tab, { expires: 7 })
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getThemeIcon = () => {
    if (theme === 'system') return <Monitor className="w-5 h-5" />
    return actualTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Student Number */}
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Student: 12345678
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'home'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('home')}
            >
              Home
            </Link>
            <Link
              href="/github"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'github'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('github')}
            >
              GitHub
            </Link>
            <Link
              href="/database"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'database'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('database')}
            >
              Database
            </Link>
            <Link
              href="/docker"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'docker'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('docker')}
            >
              Docker
            </Link>
            <Link
              href="/users"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('users')}
            >
              Users
            </Link>
            <Link
              href="/api-test"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'api-test'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('api-test')}
            >
              API Test
            </Link>
            <Link
              href="/api-docs"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'api-docs'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('api-docs')}
            >
              API Docs
            </Link>
            <Link
              href="/createblog"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'createblog'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('createblog')}
            >
              Create Blog
            </Link>
            <Link
              href="/monitoring"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'monitoring'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('monitoring')}
            >
              Monitoring
            </Link>
            <Link
              href="/aws-deployment"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'aws-deployment'
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              onClick={() => handleTabChange('aws-deployment')}
            >
              AWS Deployment
            </Link>
          </nav>

          {/* Theme Toggle and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
            >
              {getThemeIcon()}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'home'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('home')}
              >
                Home
              </Link>
              <Link
                href="/github"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'github'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('github')}
              >
                GitHub
              </Link>
              <Link
                href="/database"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'database'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('database')}
              >
                Database
              </Link>
              <Link
                href="/docker"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'docker'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('docker')}
              >
                Docker
              </Link>
              <Link
                href="/users"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'users'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('users')}
              >
                Users
              </Link>
              <Link
                href="/api-test"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'api-test'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('api-test')}
              >
                API Test
              </Link>
              <Link
                href="/api-docs"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'api-docs'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('api-docs')}
              >
                API Docs
              </Link>
              <Link
                href="/createblog"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'createblog'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('createblog')}
              >
                Create Blog
              </Link>
              <Link
                href="/monitoring"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'monitoring'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('monitoring')}
              >
                Monitoring
              </Link>
              <Link
                href="/aws-deployment"
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  activeTab === 'aws-deployment'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
                onClick={() => handleTabChange('aws-deployment')}
              >
                AWS Deployment
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
