"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + Math.random() * 15
      })
    }, 150)

    const timer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 300)
    }, 1800)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const fadeTimeout = setTimeout(() => {
        setIsVisible(false)
      }, 600)
      return () => clearTimeout(fadeTimeout)
    }
  }, [isLoading])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-600 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ backgroundColor: "var(--background, #ffffff)" }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.15), transparent 70%)",
            animation: "blobFloat 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--secondary) / 0.12), transparent 70%)",
            animation: "blobFloat 8s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.08), transparent 70%)",
            animation: "blobFloat 5s ease-in-out infinite 2s",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Logo container with ring animation */}
        <div className="relative flex items-center justify-center">
          {/* Outer pulsing ring */}
          <div
            className="absolute rounded-full border-2 border-primary/20"
            style={{
              width: 130,
              height: 130,
              animation: "ringPulse 2s ease-out infinite",
            }}
          />
          {/* Inner pulsing ring */}
          <div
            className="absolute rounded-full border border-primary/30"
            style={{
              width: 108,
              height: 108,
              animation: "ringPulse 2s ease-out infinite 0.4s",
            }}
          />
          {/* Logo card */}
          <div
            className="relative z-10 flex items-center justify-center rounded-2xl p-4 shadow-2xl"
            style={{
              background: "hsl(var(--background) / 0.9)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 40px hsl(var(--primary) / 0.2), 0 8px 32px rgba(0,0,0,0.12)",
              width: 90,
              height: 90,
            }}
          >
            <Image
              src="/images/logo.jpg"
              alt="Prof Helper Logo"
              width={70}
              height={70}
              className="rounded-xl object-contain"
              priority
            />
          </div>
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-1">
          <h1
            className="text-3xl font-bold tracking-tight"
            style={{ color: "hsl(var(--foreground))" }}
          >
            Prof Helper
          </h1>
          <p className="text-sm font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
            Sri Lanka&apos;s #1 Assignment Service
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 1 || i === 2 ? 8 : 6,
                height: i === 1 || i === 2 ? 8 : 6,
                background: "hsl(var(--primary))",
                opacity: 0.9,
                animation: `dotBounce 1.2s ease-in-out infinite`,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div
          className="w-56 overflow-hidden rounded-full"
          style={{
            height: 4,
            background: "hsl(var(--muted))",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))",
              boxShadow: "0 0 8px hsl(var(--primary) / 0.6)",
            }}
          />
        </div>

        {/* Loading text */}
        <p
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "hsl(var(--muted-foreground))", opacity: 0.7 }}
        >
          Loading...
        </p>
      </div>

      <style>{`
        @keyframes ringPulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.9); opacity: 0.8; }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 10px) scale(0.95); }
        }
        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
