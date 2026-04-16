"use client"

import { useEffect, useState } from "react"
import { Users, Star, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { collection, getDocs, Timestamp } from "firebase/firestore"

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  )
}

export function HeroSection() {
  const [averageRating, setAverageRating] = useState<string>("5.0")
  const [reviewCount, setReviewCount] = useState<number>(0)

  useEffect(() => {
    async function fetchRating() {
      try {
        const snapshot = await getDocs(collection(db, "reviews"))
        if (snapshot.size === 0) return

        let total = 0
        snapshot.forEach((doc) => {
          const data = doc.data() as { rating: number; createdAt: Timestamp | null }
          if (typeof data.rating === "number") {
            total += data.rating
          }
        })

        // Firebase reviews count for dynamic average; floor to 1 decimal
        const avg = total / snapshot.size
        // Blend with 6 default 5-star reviews to get combined avg
        const defaultTotal = 5 * 6 // 6 default reviews all rated 5
        const combined = (total + defaultTotal) / (snapshot.size + 6)
        setAverageRating(combined.toFixed(1))
        setReviewCount(snapshot.size)
      } catch {
        // silently keep defaults
      }
    }
    fetchRating()
  }, [])

  const trustBadges = [
    { icon: Users, label: "4.1K+", sublabel: "Happy Students" },
    {
      icon: Star,
      label: `${averageRating}★`,
      sublabel: "Average Rating",
      stars: Number(averageRating),
      count: reviewCount,
    },
    { icon: Shield, label: "100%", sublabel: "Confidential" },
    { icon: Clock, label: "24/7", sublabel: "Support Available" },
  ]

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-background pb-16 pt-12 sm:pb-24 sm:pt-16 lg:pb-32 lg:pt-24"
    >
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
            <Button
              size="lg"
              asChild
              className="w-full rounded-xl bg-primary/90 shadow-lg shadow-primary/25 backdrop-blur-sm hover:bg-primary sm:w-auto"
            >
              <a href="https://wa.me/94711055837" target="_blank" rel="noopener noreferrer">
                Get Started Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full rounded-xl border-border/50 bg-background/60 backdrop-blur-sm hover:bg-background/80 sm:w-auto"
            >
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
                <span className="mt-1 text-sm text-muted-foreground">{badge.sublabel}</span>

                {/* Show real star rating row only on the rating badge */}
                {"stars" in badge && (
                  <div className="mt-2 flex flex-col items-center gap-1">
                    <StarRatingDisplay rating={badge.stars} />
                    {badge.count > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {badge.count} real review{badge.count !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                )}
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
