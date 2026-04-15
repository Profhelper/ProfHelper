import { FileText, Search, CheckCircle, GraduationCap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: FileText,
    title: "Assignment Writing",
    description: "Custom assignments written by experts tailored to your requirements",
    features: ["Any subject", "All academic levels", "100% Original"],
  },
  {
    icon: Search,
    title: "Research Papers",
    description: "In-depth research with proper citations in all formats",
    features: ["APA", "MLA", "Harvard", "Chicago"],
  },
  {
    icon: CheckCircle,
    title: "Editing & Proofreading",
    description: "Professional editing to perfect your existing work",
    features: ["Grammar", "Structure", "Formatting", "Citations"],
  },
  {
    icon: GraduationCap,
    title: "Tutoring & Guidance",
    description: "Learn while getting expert help and step-by-step guidance",
    features: ["Live consultations", "Concept clarity", "Skill building"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What We Offer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Comprehensive academic support services to help you succeed
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group rounded-2xl border-border/50 bg-background/60 backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-xl bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
