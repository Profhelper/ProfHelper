import { Users, Award, Zap, Lock, Wallet } from "lucide-react"

const features = [
  {
    icon: Users,
    title: "Expert Network",
    description: "50+ vetted writers across disciplines",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "Original content + unlimited revisions + money-back guarantee",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description: "Express delivery (24-48hrs) + real-time tracking",
  },
  {
    icon: Lock,
    title: "Confidentiality",
    description: "Your privacy is guaranteed, secure payments",
  },
  {
    icon: Wallet,
    title: "Affordable Pricing",
    description: "Flexible payments, student discounts, no hidden charges",
  },
]

export function WhyChooseUs() {
  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Why Prof Helper?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We&apos;re committed to your academic success
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group flex flex-col items-center rounded-2xl border border-border/50 bg-background/60 p-6 text-center shadow-lg backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
