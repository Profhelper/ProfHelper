"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, MessageCircle, Phone, Mail, MapPin } from "lucide-react"

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Glassy Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
      <div className="absolute inset-0 bg-primary/5" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block">
              <div className="rounded-2xl border border-border/50 bg-background/60 p-3 shadow-lg backdrop-blur-xl">
                <Image
                  src="/images/logo.jpg"
                  alt="Prof Helper Logo"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-xl object-contain"
                />
              </div>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Sri Lanka&apos;s Most Trusted Assignment Writing Service. Expert writers, guaranteed quality, 24/7 support.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100077632401082"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-background/60 text-muted-foreground shadow-lg backdrop-blur-xl transition-all hover:border-primary/50 hover:bg-primary hover:text-primary-foreground hover:shadow-primary/25"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://wa.me/94711055837"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-background/60 text-muted-foreground shadow-lg backdrop-blur-xl transition-all hover:border-green-500/50 hover:bg-green-500 hover:text-white hover:shadow-green-500/25"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact Us
            </h3>
            <ul className="mt-5 space-y-4">
              <li>
                <a
                  href="https://wa.me/94711055837"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MessageCircle className="h-4 w-4" />
                  </span>
                  071 105 5837
                </a>
              </li>
              <li>
                <a
                  href="tel:+94760233028"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  076 023 3028
                </a>
              </li>
              <li>
                <a
                  href="mailto:profhelper1@gmail.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  profhelper1@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                Maharagama, Sri Lanka
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Business Hours
            </h3>
            <div className="mt-5 rounded-2xl border border-border/50 bg-background/60 p-5 shadow-lg backdrop-blur-xl">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mon - Fri</span>
                  <span className="font-medium text-foreground">9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium text-foreground">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium text-foreground">By Appointment</span>
                </div>
                <div className="mt-4 rounded-xl bg-green-500/10 px-3 py-2 text-center text-xs font-medium text-green-600 dark:text-green-400">
                  WhatsApp Support: 24/7
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="rounded-2xl border border-border/50 bg-background/60 px-6 py-5 shadow-lg backdrop-blur-xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Prof Helper. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Created by <span className="font-semibold text-primary">NanoKillX</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
