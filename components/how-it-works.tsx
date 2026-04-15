import { Upload, UserCheck, RefreshCw, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Submit Request",
    description: "Fill form with assignment details, upload materials and set deadline",
  },
  {
    icon: UserCheck,
    step: "02",
    title: "Expert Assignment",
    description: "Get matched with qualified writer, receive writer profile and credentials",
  },
  {
    icon: RefreshCw,
    step: "03",
    title: "Review & Revise",
    description: "Receive draft for review, request unlimited revisions",
  },
  {
    icon: Download,
    step: "04",
    title: "Receive & Download",
    description: "Download final polished work with plagiarism report included",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple 4-Step Process
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Get your assignment done in just a few simple steps
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative flex flex-col items-center rounded-2xl border border-border/50 bg-background/60 p-6 text-center shadow-lg backdrop-blur-xl transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-0.5 w-6 bg-primary/30 lg:block" />
              )}
              
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                <item.icon className="h-7 w-7" />
              </div>
              <span className="mt-4 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Step {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
