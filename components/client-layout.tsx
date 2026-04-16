"use client"

import { LoadingScreen } from "@/components/loading-screen"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingScreen />
      {children}
    </>
  )
}
