import type { Metadata } from "next"
import ContactForm from "@/components/contact/ContactForm"
import FadeUp from "@/components/ui/FadeUp"
import Card from "@/components/ui/Card"
import PageHero from "@/components/common/PageHero"
import { siteConfig } from "@/lib/data"

export const metadata: Metadata = {
  title: "Contact | REAMTECH PRECISION TOOLS",
  description:
    "Get in touch with Reamtech Precision Tools for product enquiries, custom tooling requests, service and regrinding, or technical support.",
}

const contactMethods = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: siteConfig.location,
    href: undefined,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
]

export default function ContactPage() {
  return (
    <div className="bg-ow-50 text-ow-950">
      <PageHero
        label="Speak with an engineer"
        heading="Contact"
        description="Describe your bore requirement, send us a drawing, or ask a technical question. We respond within one business day."
      />

      <section className="relative overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        <div className="padding-global py-20 md:py-28">
          <div className="container-large">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Form column */}
              <FadeUp className="lg:col-span-7">
                <div className="bg-white rounded-2xl border border-ow-100 p-8 md:p-10 shadow-sm">
                  <ContactForm />
                </div>
              </FadeUp>

              {/* Info column */}
              <FadeUp delay={0.15} className="lg:col-span-5">
                <div className="lg:sticky lg:top-24">
                  {/* Response promise */}
                  <div className="p-5 rounded-xl bg-orange-50 border border-orange-100 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold text-orange-800">Response within 24 hours</span>
                    </div>
                    <p className="text-xs text-orange-700/80 leading-relaxed">
                      Our engineering team reviews every enquiry and responds with a technical proposal within one business day.
                    </p>
                  </div>

                  {/* Direct contact */}
                  <p className="text-xs uppercase tracking-[0.2em] text-ow-500 font-medium mb-6">Direct contact</p>

                  <div className="space-y-4 mb-8">
                    {contactMethods.map((method) => (
                      <div
                        key={method.label}
                        className="group p-4 rounded-xl border border-ow-100 bg-white hover:border-orange-200 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-ow-100 flex items-center justify-center text-ow-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors shrink-0">
                            {method.icon}
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-ow-400 block mb-1">
                              {method.label}
                            </span>
                            {method.href ? (
                              <a
                                href={method.href}
                                className="text-sm text-ow-800 hover:text-orange-600 transition-colors font-medium"
                              >
                                {method.value}
                              </a>
                            ) : (
                              <span className="text-sm text-ow-800 font-medium">{method.value}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Working hours */}
                  <div className="p-4 rounded-xl border border-ow-100 bg-white mb-8">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-ow-100 flex items-center justify-center text-ow-500 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-ow-400 block mb-1">Working Hours</span>
                        <span className="text-sm text-ow-800 font-medium block">Mon – Sat: 9:00 AM – 6:00 PM</span>
                        <span className="text-xs text-ow-500">Sunday & Public Holidays: Closed</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust indicators */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-xl bg-white border border-ow-100 text-center">
                      <div className="font-mono text-2xl font-medium text-ow-975 mb-1">14+</div>
                      <div className="text-xs text-ow-500">Years Experience</div>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-ow-100 text-center">
                      <div className="font-mono text-2xl font-medium text-ow-975 mb-1">500+</div>
                      <div className="text-xs text-ow-500">Projects Delivered</div>
                    </div>
                  </div>

                  {/* Map preview */}
                  <div className="rounded-xl overflow-hidden border border-ow-100 bg-white">
                    <div className="relative h-44 bg-ow-100">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.56659920903!2d77.46612560364059!3d12.953945614011953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1718009825000!5m2!1sen!2sin"
                        className="absolute inset-0 w-full h-full border-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Reamtech Location"
                      />
                    </div>
                    <a 
                      href="https://maps.google.com/?q=Bengaluru,Karnataka,India" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 text-xs text-ow-600 hover:text-orange-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open in Google Maps
                    </a>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
