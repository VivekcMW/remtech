import type { Metadata } from "next"
import { siteConfig } from "@/lib/data"
import FadeUp from "@/components/ui/FadeUp"
import Button from "@/components/ui/Button"
import SectionHeader from "@/components/ui/SectionHeader"
import Card from "@/components/ui/Card"
import PageHero from "@/components/common/PageHero"
import SectionCTA from "@/components/common/SectionCTA"
import AboutStats from "@/components/about/AboutStats"

export const metadata: Metadata = {
  title: "About | REAMTECH PRECISION TOOLS",
  description:
    "Founded in 2011 in Bengaluru, Reamtech Precision Tools engineers high-accuracy reaming solutions for production machining environments across India.",
}

const values = [
  {
    number: "01",
    title: "Right First Time",
    body: "Every tool that leaves our facility is expected to produce the correct bore on its first pass. We design to eliminate the rework cycle, not manage it.",
  },
  {
    number: "02",
    title: "Production Reality",
    body: "Precision tooling that cannot survive a production environment is useless. We engineer for repeatability across millions of cycles, not just lab conditions.",
  },
  {
    number: "03",
    title: "No Capital Expenditure",
    body: "Our tooling integrates with existing CNC machine interfaces. Customers achieve significant quality improvements without replacing equipment.",
  },
  {
    number: "04",
    title: "Expandable by Design",
    body: "Wear is inevitable. Our expandable reamer designs allow on-machine size adjustment, extending tool life and eliminating downtime for changeover.",
  },
]

export default function AboutPage() {
  return (
    <div className="bg-ow-50 text-ow-950">

      <PageHero
        label={`Est. ${siteConfig.founded} · ${siteConfig.location}`}
        heading={<>About<br />Reamtech</>}
        description="Reamtech Precision Tools was founded on a single conviction — that the most critical dimension in a machined component, the finished bore, should never be a source of uncertainty."
        bgVideo="/videos/cnc-machining.mp4"
      />

      {/* Company story */}
      <section className="relative" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <FadeUp>
                <SectionHeader
                  label="Our story"
                  labelStyle="allcaps"
                  heading="Precision as a founding principle"
                />
              </FadeUp>
              <FadeUp delay={0.15} className="flex flex-col gap-6">
                <p className="text-size-medium">
                  In 2011, Reamtech Precision Tools was established in Bengaluru, Karnataka, to
                  address a gap in the Indian precision tooling market. Manufacturers were achieving
                  acceptable bore tolerances through expensive, iterative processes — multiple passes,
                  frequent tool changes, and high levels of in-process inspection.
                </p>
                <p className="text-size-medium">
                  Our founders recognised that the reaming operation — the final step in bore
                  finishing — was the right place to intervene. By engineering tools that compensate
                  for wear on the machine, we moved the cost of quality from the inspection station
                  back to the tool itself.
                </p>
                <p className="text-size-medium">
                  Today, Reamtech tools are used across automotive, aerospace, hydraulics, and
                  general precision engineering applications throughout India.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <AboutStats />

      {/* Values */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <FadeUp className="mb-16">
              <SectionHeader
                label="How we work"
                labelStyle="allcaps"
                heading="Four principles behind every tool we make"
              />
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 border border-ow-300">
              {values.map((v, i) => (
                <FadeUp
                  key={v.number}
                  delay={i * 0.09}
                  className="p-10"
                  style={{
                    borderRight:  i % 2 === 0 ? "1px solid rgba(0,0,0,0.09)" : "none",
                    borderBottom: i < 2       ? "1px solid rgba(0,0,0,0.09)" : "none",
                  }}
                >
                  <div className="text-orange-500 font-mono text-xs tracking-widest mb-6">{v.number}</div>
                  <h3 className="heading-style-h3 mb-4">{v.title}</h3>
                  <p className="text-size-medium">{v.body}</p>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="padding-global padding-section-large">
          <div className="container-large">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <FadeUp>
                <p className="text-style-allcaps text-style-muted-50 mb-6">Based in</p>
                <h2 className="heading-style-h2">Bengaluru,<br />Karnataka</h2>
                <p className="text-size-medium mt-6 max-w-sm">
                  Our manufacturing facility and application engineering team are located in
                  Bengaluru, India&rsquo;s engineering and technology capital. We serve customers
                  across the Indian subcontinent via a direct sales model.
                </p>
                <div className="button-group">
                  <Button href="/contact">Speak with us</Button>
                  <Button href="/products" variant="secondary" showDot={false}>View products</Button>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <Card className="divide-y divide-ow-300">
                  {[
                    { label: "Location", value: siteConfig.location },
                    { label: "Email",    value: siteConfig.email,    href: `mailto:${siteConfig.email}` },
                    { label: "Phone",    value: siteConfig.phone,    href: `tel:${siteConfig.phone}` },
                    { label: "Founded",  value: String(siteConfig.founded) },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center gap-8 px-6 py-4">
                      <span className="text-style-allcaps text-style-muted-50">{row.label}</span>
                      {row.href ? (
                        <a href={row.href} className="text-sm text-ow-700 hover:text-orange-500 transition-colors text-right">
                          {row.value}
                        </a>
                      ) : (
                        <span className="text-sm text-ow-700 text-right">{row.value}</span>
                      )}
                    </div>
                  ))}
                </Card>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <SectionCTA
        heading="Ready to improve your bore quality?"
        description="Speak with an application engineer about your specific requirement."
        primaryHref="/contact"
        primaryLabel="Get in touch"
        secondaryHref="/products"
        secondaryLabel="View products"
      />
    </div>
  )
}
