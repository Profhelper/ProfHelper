"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="rounded-xl">
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-xl bg-background/50 backdrop-blur-sm hover:bg-background/80"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-foreground transition-all" />
      ) : (
        <Moon className="h-5 w-5 text-foreground transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
