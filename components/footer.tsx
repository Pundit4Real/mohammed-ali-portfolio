import Link from "next/link"
import { Github, Linkedin, Twitter, X } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Mohammed Ali</h3>
            <p className="text-gray-400 text-sm">Software Engineer & AI Solutions Architect</p>
            <div className="flex gap-4 pt-2">
              <a href="https://github.com/Pundit4Real" className="text-secondary hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/mohammed-ali7/" className="text-secondary hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/punditiTech" className="text-secondary hover:text-primary transition-colors">
                <X size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-400 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">More</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/experience" className="text-gray-400 hover:text-primary transition-colors">
                  Experience
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-400 hover:text-primary transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Get In Touch</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: mohammedaalli088@gmail.com</li>
              <li>Based in: Sunyani, Ghana</li>
              <li className="pt-2">
                <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2"></span>
                Available for projects
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {currentYear} Mohammed Ali. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
