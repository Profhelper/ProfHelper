import { MessageCircle, Phone, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const contactInfo = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "071 105 5837",
    href: "https://wa.me/94711055837",
  },
  {
    icon: Phone,
    label: "Alternate",
    value: "076 023 3028",
    href: "tel:+94760233028",
  },
  {
    icon: Mail,
    label: "Email",
    value: "profhelper1@gmail.com",
    href: "mailto:profhelper1@gmail.com",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Available 24/7",
    href: null,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-primary/90 py-16 backdrop-blur-xl sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to Succeed?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Get in touch with us today and take the first step towards academic excellence.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="w-full rounded-xl bg-white/90 text-primary shadow-lg backdrop-blur-sm hover:bg-white sm:w-auto"
            >
              <a
                href="https://wa.me/94711055837"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full rounded-xl border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/20 hover:text-primary-foreground sm:w-auto"
            >
              <a href="mailto:profhelper1@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </a>
            </Button>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-6 backdrop-blur-xl transition-all hover:bg-primary-foreground/20"
              >
                <item.icon className="h-8 w-8 text-primary-foreground" />
                <span className="mt-3 text-sm font-medium text-primary-foreground/70">
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-1 text-lg font-semibold text-primary-foreground hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  <span className="mt-1 text-lg font-semibold text-primary-foreground">
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
