"use client"

import { useState } from "react"
import { Star, Quote } from "lucide-react"
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

const reviews = [
  {
    name: "Kasun P.",
    service: "Assignment Writing",
    rating: 5,
    text: "Excellent service! My assignment was delivered on time and the quality exceeded my expectations. Highly recommend Prof Helper to all students.",
    date: "2 weeks ago",
  },
  {
    name: "Dilini S.",
    service: "Research Paper",
    rating: 5,
    text: "The research paper was well-structured with proper citations. The writer understood exactly what I needed. Will definitely use again!",
    date: "1 month ago",
  },
  {
    name: "Nuwan K.",
    service: "Editing & Proofreading",
    rating: 4,
    text: "Great editing service. They improved my essay significantly. The turnaround time was impressive.",
    date: "3 weeks ago",
  },
  {
    name: "Shanika M.",
    service: "Tutoring",
    rating: 5,
    text: "The tutoring sessions helped me understand complex concepts. My grades have improved significantly since working with Prof Helper.",
    date: "1 week ago",
  },
  {
    name: "Chamara R.",
    service: "Assignment Writing",
    rating: 5,
    text: "Professional service with great communication. They kept me updated throughout the process. Very satisfied with the final result.",
    date: "2 months ago",
  },
  {
    name: "Tharushi W.",
    service: "Research Paper",
    rating: 5,
    text: "Outstanding quality! The research was thorough and the paper was exactly what my professor wanted. Thank you Prof Helper!",
    date: "3 weeks ago",
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

export function ReviewsSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    rating: 0,
    title: "",
    review: "",
  })

  const averageRating = (
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  ).toFixed(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send to an API
    console.log("Review submitted:", formData)
    setIsOpen(false)
    setFormData({
      name: "",
      email: "",
      service: "",
      rating: 0,
      title: "",
      review: "",
    })
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
                ({reviews.length}+ reviews)
              </span>
            </div>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-primary/90 shadow-lg shadow-primary/25 backdrop-blur-sm hover:bg-primary">Add Your Review</Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl border-border/50 bg-background/95 backdrop-blur-xl sm:max-w-[425px]">
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
                  >
                    <SelectTrigger>
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
                    minLength={20}
                    maxLength={500}
                    rows={4}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.review.length}/500 characters
                  </p>
                </div>
                <Button type="submit" className="w-full rounded-xl bg-primary/90 shadow-lg shadow-primary/25 hover:bg-primary">
                  Submit Review
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="rounded-2xl border-border/50 bg-background/60 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
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
      </div>
    </section>
  )
}
