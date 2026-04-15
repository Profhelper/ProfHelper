import { Users, Star, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const trustBadges = [
  { icon: Users, label: "4.1K+", sublabel: "Happy Students" },
  { icon: Star, label: "5★", sublabel: "Average Rating" },
  { icon: Shield, label: "100%", sublabel: "Confidential" },
  { icon: Clock, label: "24/7", sublabel: "Support Available" },
]

export function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-background pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pb-32 lg:pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Assignment Success
            <span className="block text-primary">Starts Here</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Sri Lanka&apos;s #1 Trusted Assignment Writing Service | Expert Writers | Guaranteed Quality
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full rounded-xl bg-primary/90 shadow-lg shadow-primary/25 backdrop-blur-sm hover:bg-primary sm:w-auto">
              <a
                href="https://wa.me/94711055837"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Now
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full rounded-xl border-border/50 bg-background/60 backdrop-blur-sm hover:bg-background/80 sm:w-auto">
              <a href="#reviews">View Our Work</a>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
            {trustBadges.map((badge) => (
              <div
                key={badge.sublabel}
                className="flex flex-col items-center rounded-2xl border border-border/50 bg-background/60 p-5 shadow-lg backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 lg:p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <badge.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="mt-4 text-2xl font-bold text-foreground lg:text-3xl">
                  {badge.label}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {badge.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -top-24 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />
    </section>
  )
}
