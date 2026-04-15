"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/60 px-4 py-2 shadow-lg shadow-primary/5 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.jpg"
              alt="Prof Helper Logo"
              width={48}
              height={48}
              className="h-11 w-11 rounded-xl object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-primary/10 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <Button asChild className="hidden rounded-xl bg-primary/90 shadow-lg shadow-primary/25 backdrop-blur-sm hover:bg-primary sm:inline-flex">
              <a
                href="https://wa.me/94711055837"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Get Started
              </a>
            </Button>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-xl md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="mt-2 rounded-2xl border border-border/50 bg-background/80 p-4 shadow-lg backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-all hover:bg-primary/10"
                >
                  {link.label}
                </a>
              ))}
              <Button asChild className="mt-3 w-full rounded-xl bg-primary/90 shadow-lg shadow-primary/25">
                <a
                  href="https://wa.me/94711055837"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Get Started
                </a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
