"use client"

import { useState, useEffect } from "react"
import { Star, Quote, Loader2 } from "lucide-react"
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
  Timestamp
} from "firebase/firestore"

interface Review {
  id: string
  name: string
  email: string
  service: string
  rating: number
  title: string
  text: string
  createdAt: Timestamp | null
}

const defaultReviews: Omit<Review, "id" | "email" | "title" | "createdAt">[] = [
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

function StarRating({ rating, interactive = false, onRatingChange }: { 
  rating: number
  interactive?: boolean
  onRatingChange?: (rating: number) => void 
}) {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type={interactive ? "button" : undefined}
          disabled={!interactive}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={interactive ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            className={`h-5 w-5 ${
              star <= (hoverRating || rating)
                ? "fill-accent text-accent"
                : "text-muted-foreground/30"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

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

export function ReviewsSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    rating: 0,
    title: "",
    review: "",
  })

  // Fetch reviews from Firestore
  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviewsRef = collection(db, "reviews")
        // Use simple getDocs without orderBy to avoid composite index requirement
        const querySnapshot = await getDocs(reviewsRef)
        
        const fetchedReviews: Review[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Review[]
        
        // Sort client-side: newest first (null createdAt = just submitted, goes first)
        fetchedReviews.sort((a, b) => {
          if (!a.createdAt) return -1
          if (!b.createdAt) return 1
          return b.createdAt.toMillis() - a.createdAt.toMillis()
        })
        
        setReviews(fetchedReviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
        // Silently fall back to default reviews on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [])

  // Combine Firebase reviews with default reviews for display
  const allReviews = [
    ...reviews.map((r) => ({
      name: r.name,
      service: getServiceLabel(r.service),
      rating: r.rating,
      text: r.text,
      date: getTimeAgo(r.createdAt),
    })),
    ...defaultReviews.map((r) => ({
      ...r,
      date: "Verified customer",
    })),
  ]

  const averageRating = (
    allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length
  ).toFixed(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.rating === 0) {
      alert("Please select a rating")
      return
    }

    setIsSubmitting(true)

    try {
      const reviewData = {
        name: formData.name,
        email: formData.email,
        service: formData.service,
        rating: formData.rating,
        title: formData.title,
        text: formData.review,
        createdAt: serverTimestamp(),
      }

      const docRef = await addDoc(collection(db, "reviews"), reviewData)
      
      // Add the new review to the local state
      const newReview: Review = {
        id: docRef.id,
        ...reviewData,
        createdAt: null, // Will be "Just now" in display
      }
      
      setReviews((prev) => [newReview, ...prev])
      setIsOpen(false)
      setFormData({
        name: "",
        email: "",
        service: "",
        rating: 0,
        title: "",
        review: "",
      })
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
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Our Clients Say
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-lg font-semibold text-foreground">
                {averageRating}/5
              </span>
              <span className="text-muted-foreground">
                ({allReviews.length}+ reviews)
              </span>
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary/90 shadow-lg shadow-primary/25 backdrop-blur-sm hover:bg-primary">
                Add Your Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl border-border/50 bg-background/95 backdrop-blur-xl sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Share Your Experience</DialogTitle>
                <DialogDescription>
                  Help other students by sharing your experience with Prof Helper.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="rounded-xl"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Used</Label>
                  <Select
                    value={formData.service}
                    onValueChange={(value) =>
                      setFormData({ ...formData, service: value })
                    }
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
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <StarRating
                    rating={formData.rating}
                    interactive
                    onRatingChange={(rating) =>
                      setFormData({ ...formData, rating })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Review Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Brief summary of your experience"
                    className="rounded-xl"
                    maxLength={100}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="review">Your Review</Label>
                  <Textarea
                    id="review"
                    value={formData.review}
                    onChange={(e) =>
                      setFormData({ ...formData, review: e.target.value })
                    }
                    placeholder="Share your experience with Prof Helper..."
                    className="rounded-xl"
                    minLength={20}
                    maxLength={500}
                    rows={4}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.review.length}/500 characters
                  </p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-xl bg-primary/90 shadow-lg shadow-primary/25 hover:bg-primary"
                  disabled={isSubmitting}
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
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="mt-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allReviews.map((review, index) => (
              <Card 
                key={index} 
                className="rounded-2xl border-border/50 bg-background/60 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
              >
                <CardContent className="p-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/30" />
                  <p className="text-muted-foreground">{review.text}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-sm text-muted-foreground">{review.service}</p>
                    </div>
                    <div className="text-right">
                      <StarRating rating={review.rating} />
                      <p className="mt-1 text-xs text-muted-foreground">
                        {review.date}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
