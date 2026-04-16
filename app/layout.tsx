import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { ClientLayout } from '@/components/client-layout'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Prof Helper | Sri Lanka\'s #1 Assignment Writing Service',
  description: 'Expert assignment writing, research papers, editing & tutoring services. Trusted by 4.1K+ students. 24/7 support, 100% confidential, guaranteed quality.',
  keywords: 'assignment writing, Sri Lanka, research papers, tutoring, academic help, essay writing',
  icons: {
    icon: '/images/logo.jpg',
    apple: '/images/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientLayout>
            {children}
          </ClientLayout>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
