import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search, CreditCard, PlayCircle, Award } from "lucide-react"

const steps = [
  {
    icon: Search,
    number: "01.",
    title: "Find your course",
    description: "Browse 500+ expert-led courses across web dev, design, data science, and more. Filter by skill level and topic.",
  },
  {
    icon: CreditCard,
    number: "02.",
    title: "Enroll in seconds",
    description: "Sign up and get instant access to your course materials, no waiting required.",
  },
  {
    icon: PlayCircle,
    number: "03.",
    title: "Learn at your pace",
    description: "Watch lessons, complete projects, and track your progress anytime, anywhere.",
  },
  {
    icon: Award,
    number: "04.",
    title: "Earn your certificate",
    description: "Complete the course and get a certificate to showcase your new skills.",
  },
]

export default function HowItWorks() {
  return (
    <section className="max-w-4xl mx-auto py-16 px-4">

      <Accordion multiple={false} className="grid sm:grid-cols-2 gap-4">
        {steps.map((step) => (
          <AccordionItem
            key={step.number}
            value={step.number}
            className="border rounded-xl px-6 py-2"
          >
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#4f46e5] flex items-center justify-center shrink-0">
                  <step.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">
                  <span className="text-[#4f46e5]">{step.number}</span> {step.title}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 pl-14">
              {step.description}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}