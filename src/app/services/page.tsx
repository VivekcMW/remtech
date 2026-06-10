import type { Metadata } from "next"
import FadeUp from "@/components/ui/FadeUp"
import SectionHeader from "@/components/ui/SectionHeader"
import PageHero from "@/components/common/PageHero"
import SectionCTA from "@/components/common/SectionCTA"

export const metadata: Metadata = {
  title: "Services | REAMTECH PRECISION TOOLS",
  description:
    "Custom tool design, tool regrinding and reconditioning, application engineering, and tool management programs from Reamtech Precision Tools, Bengaluru.",
}

const services = [
  {
    id: "01",
    title: "Custom Tool Design & Manufacturing",
    tagline: "Ground to your drawing. Delivered to your tolerance.",
    description:
      "We design and manufacture precision reamers, boring tools, and multi-step tooling to customer-specific drawings and requirements. Every custom tool is produced from premium carbide grades and ground on CNC tool-grinding centres.",
    items: [
      "Full design service from application brief to finished drawing",
      "Carbide, PCD, and brazed-tip construction options",
      "Tolerances from H6 to H9, or to customer specification",
      "Standard lead time 10–15 working days; express available",
      "Detailed inspection report with every order",
    ],
    accent: "#f97316",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "Tool Regrinding & Reconditioning",
    tagline: "Restore cutting performance. Recover tool cost.",
    description:
      "Worn reamers and boring tools can recover 80–90% of their original cutting performance after professional regrinding. Our regrinding service uses the same CNC tool grinders as our new-tool production.",
    items: [
      "Solid carbide and brazed-tip reamers accepted",
      "Full geometry restoration to original specification",
      "Post-grind coating (TiN, TiAlN) available",
      "Inspection report before and after reconditioning",
      "3–5 day turnaround standard; 48-hour express available",
    ],
    accent: "#f43f5e",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Application Engineering",
    tagline: "The right tool for the specific bore. Not the general bore.",
    description:
      "Our application engineers work with customers to define cutting data, coolant strategy, machine interface, and pre-bore tolerances that together guarantee the bore specification.",
    items: [
      "On-site visits for production troubleshooting",
      "Cutting data and parameter optimisation",
      "Pre-bore specification and inspection guidance",
      "Machine interface and holder recommendations",
      "Remote technical support via phone and email",
    ],
    accent: "#10b981",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: "04",
    title: "Tool Management Programs",
    tagline: "Never stop the line for a reamer.",
    description:
      "For high-volume production environments, we operate vendor-managed inventory programs that ensure the correct tools are available at the machine when needed.",
    items: [
      "Consignment or VMI stock programs",
      "Automated reorder triggers based on consumption",
      "Regrinding schedule managed by Reamtech",
      "Single point of contact for all tooling requirements",
      "Monthly usage and cost reporting",
    ],
    accent: "#a855f7",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
  },
]

const process = [
  { step: "01", title: "Brief",          body: "Send us a drawing, a part sample, or a description of the bore requirement. We review and confirm feasibility." },
  { step: "02", title: "Proposal",       body: "Within 24 hours we provide a written tool proposal with geometry, material, tolerance, and a fixed price." },
  { step: "03", title: "Manufacture",    body: "Approved orders enter our production queue. Standard lead time is 10–15 working days from drawing approval." },
  { step: "04", title: "Inspect & Ship", body: "Every tool is measured on a CNC inspection centre. The report ships with the tool, calibrated to NABL-accredited standards." },
]

export default function ServicesPage() {
  return (
    <div className="bg-ow-50 text-ow-950">

      <PageHero
        label="What we do"
        heading="Services"
        description="From one-off custom tools to managed inventory programs — end-to-end support for every stage of your precision bore finishing operation."
        bgVideo="/videos/cnc-machining.mp4"
      />

      {/* Service cards */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <div className="flex flex-col divide-y divide-ow-200">
              {services.map((svc, i) => (
                <FadeUp key={svc.id} delay={i * 0.06} className="py-16 first:pt-0 last:pb-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ background: `${svc.accent}15`, color: svc.accent }}
                        >
                          {svc.icon}
                        </div>
                        <span className="font-mono text-xs tracking-widest" style={{ color: svc.accent }}>{svc.id}</span>
                        <span className="flex-1 h-px bg-ow-200" />
                      </div>
                      <h2 className="heading-style-h3 mb-3">{svc.title}</h2>
                      <p className="text-sm mb-6 italic" style={{ color: svc.accent }}>{svc.tagline}</p>
                      <p className="text-size-medium">{svc.description}</p>
                    </div>
                    <div>
                      <p className="text-style-allcaps text-style-muted-50 mb-5">Includes</p>
                      <ul className="flex flex-col gap-3">
                        {svc.items.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-sm text-ow-700">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: svc.accent }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-ow-100" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <FadeUp className="mb-16">
              <SectionHeader
                label="Process"
                labelStyle="allcaps"
                heading="From brief to bore"
              />
            </FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-ow-300">
              {process.map((p, i) => (
                <FadeUp key={p.step} delay={i * 0.08} className="bg-ow-50 p-10">
                  <div
                    className="text-orange-500 mb-6"
                    style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {p.step}
                  </div>
                  <h3 className="text-base font-medium text-ow-975 mb-3">{p.title}</h3>
                  <p className="text-size-small">{p.body}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionCTA
        heading="Ready to discuss your requirement?"
        description="Speak with an application engineer. No sales pitch — just tooling."
        primaryHref="/contact"
        primaryLabel="Get in touch"
        secondaryHref="/products"
        secondaryLabel="Browse products"
      />
    </div>
  )
}
