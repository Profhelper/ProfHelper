"use client"

import { useState, useEffect, useCallback } from "react"
import { Star, Quote, Loader2, ChevronDown, CheckCircle2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Review {
  id: string
  name: string
  email: string
  service: string
  rating: number
  title: string
  text: string
  createdAt: Timestamp | null
  isFirebase?: boolean
}

interface DisplayReview {
  name: string
  service: string
  rating: number
  text: string
  date: string
  isFirebase: boolean
}

// ─── Static fallback reviews (shown LAST, after Firebase reviews) ─────────────

const defaultReviews: Omit<Review, "id" | "email" | "title" | "createdAt" | "isFirebase">[] = [
  {
    name: "Kasun P.",
    service: "Assignment Writing",
    rating: 5,
    text: "Excellent service! My assignment was delivered on time and the quality exceeded my expectations. Highly recommend Prof Helper to all students.",
  },
  {
    name: "Dilini S.",
    service: "Research Paper",
    rating: 5,
    text: "The research paper was well-structured with proper citations. The writer understood exactly what I needed. Will definitely use again!",
  },
  {
    name: "Nuwan K.",
    service: "Editing & Proofreading",
    rating: 4,
    text: "Great editing service. They improved my essay significantly. The turnaround time was impressive.",
  },
  {
    name: "Shanika M.",
    service: "Tutoring",
    rating: 5,
    text: "The tutoring sessions helped me understand complex concepts. My grades have improved significantly since working with Prof Helper.",
  },
  {
    name: "Chamara R.",
    service: "Assignment Writing",
    rating: 5,
    text: "Professional service with great communication. They kept me updated throughout the process. Very satisfied with the final result.",
  },
  {
    name: "Tharushi W.",
    service: "Research Paper",
    rating: 5,
    text: "Outstanding quality! The research was thorough and the paper was exactly what my professor wanted. Thank you Prof Helper!",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTimeAgo(timestamp: Timestamp | null): string {
  if (!timestamp) return "Just now"
  const now = new Date()
  const date = timestamp.toDate()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (diffInSeconds < 60) return "Just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`
  return `${Math.floor(diffInSeconds / 2592000)} months ago`
}

function getServiceLabel(service: string): string {
  const labels: Record<string, string> = {
    assignment: "Assignment Writing",
    research: "Research Paper",
    editing: "Editing & Proofreading",
    tutoring: "Tutoring",
    other: "Other",
  }
  return labels[service] || service
}

// ─── Star Rating Component ────────────────────────────────────────────────────

function StarRating({
  rating,
  interactive = false,
  size = "md",
  onRatingChange,
}: {
  rating: number
  interactive?: boolean
  size?: "sm" | "md"
  onRatingChange?: (rating: number) => void
}) {
  const [hoverRating, setHoverRating] = useState(0)
  const starClass = size === "sm" ? "h-4 w-4" : "h-5 w-5"

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={interactive ? "cursor-pointer p-0.5 transition-transform hover:scale-110" : "cursor-default p-0.5"}
        >
          <Star
            className={`${starClass} transition-colors ${
              star <= (hoverRating || rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

// ─── Review Card Component ────────────────────────────────────────────────────

function ReviewCard({ review, index }: { review: DisplayReview; index: number }) {
  return (
    <Card
      className="group rounded-2xl border-border/50 bg-background/60 backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <CardContent className="flex h-full flex-col p-5 sm:p-6">
        <Quote className="mb-3 h-7 w-7 flex-shrink-0 text-primary/25 transition-colors group-hover:text-primary/40" />
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {review.text}
        </p>
        <div className="mt-4 flex items-end justify-between gap-2 border-t border-border/30 pt-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="truncate font-semibold text-foreground">{review.name}</p>
              {review.isFirebase && (
                <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-green-500" title="Verified review" />
              )}
            </div>
            <p className="truncate text-xs text-muted-foreground sm:text-sm">{review.service}</p>
          </div>
          <div className="flex-shrink-0 text-right">
            <StarRating rating={review.rating} size="sm" />
            <p className="mt-1 text-xs text-muted-foreground">{review.date}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

const INITIAL_SHOW_COUNT = 6

export function ReviewsSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [firebaseReviews, setFirebaseReviews] = useState<Review[]>([])
  const [showAll, setShowAll] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    rating: 0,
    title: "",
    review: "",
  })

  // Fetch reviews from Firestore
  const fetchReviews = useCallback(async () => {
    try {
      const reviewsRef = collection(db, "reviews")
      const querySnapshot = await getDocs(reviewsRef)

      const fetched: Review[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        isFirebase: true,
        ...(doc.data() as Omit<Review, "id" | "isFirebase">),
      }))

      // Sort Firebase reviews: highest rating first, then newest first
      fetched.sort((a, b) => {
        if (b.rating !== a.rating) return b.rating - a.rating
        if (!a.createdAt) return -1
        if (!b.createdAt) return 1
        return b.createdAt.toMillis() - a.createdAt.toMillis()
      })

      setFirebaseReviews(fetched)
    } catch (error) {
      console.error("Error fetching reviews:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  // Firebase reviews come FIRST (sorted by rating desc, then newest), defaults LAST
  const allDisplayReviews: DisplayReview[] = [
    ...firebaseReviews.map((r) => ({
      name: r.name,
      service: getServiceLabel(r.service),
      rating: r.rating,
      text: r.text,
      date: getTimeAgo(r.createdAt),
      isFirebase: true,
    })),
    ...defaultReviews.map((r) => ({
      ...r,
      date: "Verified customer",
      isFirebase: false,
    })),
  ]

  // Real average rating based on ALL reviews (Firebase + defaults)
  const averageRating =
    allDisplayReviews.length > 0
      ? (
          allDisplayReviews.reduce((acc, r) => acc + r.rating, 0) /
          allDisplayReviews.length
        ).toFixed(1)
      : "5.0"

  const visibleReviews = showAll
    ? allDisplayReviews
    : allDisplayReviews.slice(0, INITIAL_SHOW_COUNT)

  const hiddenCount = allDisplayReviews.length - INITIAL_SHOW_COUNT

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.rating === 0) {
      alert("Please select a star rating")
      return
    }

    setIsSubmitting(true)

    try {
      const reviewData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        service: formData.service,
        rating: formData.rating,
        title: formData.title.trim(),
        text: formData.review.trim(),
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "reviews"), reviewData)

      // Optimistically add to top of Firebase reviews
      const newReview: Review = {
        id: docRef.id,
        ...reviewData,
        createdAt: null,
        isFirebase: true,
      }

      setFirebaseReviews((prev) => [newReview, ...prev])
      setSubmitSuccess(true)

      setTimeout(() => {
        setIsOpen(false)
        setSubmitSuccess(false)
        setFormData({ name: "", email: "", service: "", rating: 0, title: "", review: "" })
      }, 1800)
    } catch (error) {
      console.error("Error adding review:", error)
      alert("Failed to submit review. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="reviews" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Our Clients Say
            </h2>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <StarRating rating={Math.round(Number(averageRating))} />
              <span className="text-lg font-bold text-foreground">{averageRating}</span>
              <span className="text-sm text-muted-foreground">/ 5.0</span>
              <span className="text-sm text-muted-foreground">
                · {allDisplayReviews.length}+ reviews
              </span>
            </div>
          </div>

          {/* Add Review Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="w-full rounded-xl bg-primary/90 shadow-lg shadow-primary/25 backdrop-blur-sm hover:bg-primary sm:w-auto">
                Add Your Review
              </Button>
            </DialogTrigger>

            {/* ── Responsive scrollable dialog ── */}
            <DialogContent
              className="
                flex flex-col
                w-full max-w-lg
                max-h-[92dvh] sm:max-h-[88vh]
                overflow-hidden
                rounded-2xl border-border/50
                bg-background/95 backdrop-blur-xl
                p-0
              "
            >
              {/* Sticky header */}
              <div className="flex-shrink-0 border-b border-border/40 px-5 pb-4 pt-5 sm:px-6">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-xl">Share Your Experience</DialogTitle>
                  <DialogDescription className="text-sm">
                    Help other students by sharing your experience with Prof Helper.
                  </DialogDescription>
                </DialogHeader>
              </div>

              {/* Scrollable form body */}
              <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
                {submitSuccess ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                    <CheckCircle2 className="h-14 w-14 text-green-500" />
                    <p className="text-lg font-semibold text-foreground">Review Submitted!</p>
                    <p className="text-sm text-muted-foreground">
                      Thank you for sharing your experience.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 pb-2">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <Label htmlFor="review-name">Full Name *</Label>
                      <Input
                        id="review-name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your name"
                        className="rounded-xl"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label htmlFor="review-email">Email *</Label>
                      <Input
                        id="review-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="rounded-xl"
                        required
                      />
                    </div>

                    {/* Service */}
                    <div className="space-y-1.5">
                      <Label>Service Used *</Label>
                      <Select
                        value={formData.service}
                        onValueChange={(value) => setFormData({ ...formData, service: value })}
                        required
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assignment">Assignment Writing</SelectItem>
                          <SelectItem value="research">Research Paper</SelectItem>
                          <SelectItem value="editing">Editing & Proofreading</SelectItem>
                          <SelectItem value="tutoring">Tutoring</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Rating */}
                    <div className="space-y-1.5">
                      <Label>Your Rating *</Label>
                      <div className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/60 px-4 py-3">
                        <StarRating
                          rating={formData.rating}
                          interactive
                          onRatingChange={(rating) => setFormData({ ...formData, rating })}
                        />
                        {formData.rating > 0 && (
                          <span className="text-sm font-medium text-foreground">
                            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][formData.rating]}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Review Title */}
                    <div className="space-y-1.5">
                      <Label htmlFor="review-title">Review Title *</Label>
                      <Input
                        id="review-title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Brief summary of your experience"
                        className="rounded-xl"
                        maxLength={100}
                        required
                      />
                    </div>

                    {/* Review Text */}
                    <div className="space-y-1.5">
                      <Label htmlFor="review-text">Your Review *</Label>
                      <Textarea
                        id="review-text"
                        value={formData.review}
                        onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                        placeholder="Share your experience with Prof Helper (min. 20 characters)..."
                        className="rounded-xl resize-none"
                        minLength={20}
                        maxLength={500}
                        rows={4}
                        required
                      />
                      <p className="text-right text-xs text-muted-foreground">
                        {formData.review.length}/500
                      </p>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full rounded-xl bg-primary/90 shadow-lg shadow-primary/25 hover:bg-primary"
                      disabled={isSubmitting || formData.rating === 0}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Review"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews Grid */}
        {isLoading ? (
          <div className="mt-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading reviews...</p>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleReviews.map((review, index) => (
                <ReviewCard key={`${review.name}-${index}`} review={review} index={index} />
              ))}
            </div>

            {/* Load More / Show Less */}
            {allDisplayReviews.length > INITIAL_SHOW_COUNT && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAll((prev) => !prev)}
                  className="group rounded-xl border-border/50 bg-background/60 backdrop-blur-sm hover:border-primary/40 hover:bg-background/80"
                >
                  {showAll ? (
                    "Show Less"
                  ) : (
                    <>
                      View All Reviews
                      <span className="ml-1.5 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                        +{hiddenCount} more
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Background decoration */}
      <div className="absolute -top-24 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-24 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-secondary/5 blur-3xl" />
    </section>
  )
}

// Export average rating so hero can use it
export { type DisplayReview }
