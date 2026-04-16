import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const pricingTiers = [
  {
    name: "Assignment Writing",
    price: "LKR 2.00",
    unit: "per word",
    description: "Custom written assignments for any subject",
    features: [
      "100% original content",
      "Any academic level",
      "All subjects covered",
      "Free revisions",
      "Plagiarism report",
    ],
    popular: false,
  },
  {
    name: "Research Paper",
    price: "LKR 2.5",
    unit: "per word",
    description: "In-depth research with proper citations",
    features: [
      "Thorough research",
      "All citation formats",
      "Expert writers",
      "Unlimited revisions",
      "Source verification",
    ],
    popular: true,
  },
  {
    name: "Editing & Proofreading",
    price: "LKR 800",
    unit: "per page",
    description: "Professional editing to perfect your work",
    features: [
      "Grammar correction",
      "Structure improvement",
      "Citation formatting",
      "Quick turnaround",
      "Track changes",
    ],
    popular: false,
  },
  {
    name: "Tutoring",
    price: "LKR 2,000",
    unit: "per hour",
    description: "One-on-one expert guidance",
    features: [
      "Live sessions",
      "Concept explanation",
      "Practice problems",
      "Flexible scheduling",
      "Session recordings",
    ],
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            No hidden fees. Student discounts available.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative rounded-2xl border-border/50 bg-background/60 backdrop-blur-xl transition-all hover:shadow-xl hover:shadow-primary/10 ${
                tier.popular ? "border-primary/50 ring-2 ring-primary/50" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-xl bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground shadow-lg shadow-primary/25">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{tier.name}</CardTitle>
                <CardDescription>{tier.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground"> {tier.unit}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-6 w-full rounded-xl ${tier.popular ? "bg-primary/90 shadow-lg shadow-primary/25" : "border-border/50 bg-background/60 backdrop-blur-sm"}`}
                  variant={tier.popular ? "default" : "outline"}
                  asChild
                >
                  <a
                    href="https://wa.me/94711055837"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get Custom Quote
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Prices may vary based on deadline urgency and complexity.{" "}
            <a
              href="https://wa.me/94711055837"
              className="text-primary underline hover:no-underline"
            >
              Contact us
            </a>{" "}
            for a detailed quote.
          </p>
        </div>
      </div>
    </section>
  )
}
