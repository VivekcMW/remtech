"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import Button from "@/components/ui/Button"

const schema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  company: z.string().min(1, "Company name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
  inquiry: z.enum(["product", "custom", "service", "support", "other"], { message: "Please select an inquiry type" }),
  message: z.string().min(20, "Please provide at least 20 characters"),
})

type FormValues = z.infer<typeof schema>

const inquiryOptions = [
  { value: "product", label: "Product enquiry", icon: "📦" },
  { value: "custom", label: "Custom tooling request", icon: "🔧" },
  { value: "service", label: "Service / regrinding", icon: "⚙️" },
  { value: "support", label: "Technical support", icon: "💬" },
  { value: "other", label: "Other", icon: "✉️" },
]

function FormField({
  label,
  error,
  children,
  className = "",
}: {
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-xs uppercase tracking-[0.15em] text-ow-500 mb-2 font-medium">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 text-xs text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(_data: FormValues) {
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        className="flex flex-col justify-center min-h-96 p-10 rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Success icon */}
        <motion.div
          className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.p
          className="text-xs uppercase tracking-[0.2em] text-orange-600 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Message received
        </motion.p>
        <motion.h2
          className="text-2xl md:text-3xl font-medium text-ow-975 mb-4 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          We&rsquo;ll be in touch
          <br />
          within one business day.
        </motion.h2>
        <motion.p
          className="text-sm text-ow-600 max-w-sm leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          An application engineer will review your enquiry and reply with a direct, technical response.
        </motion.p>

        {/* Background decoration */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-orange-100/50" />
      </motion.div>
    )
  }

  const inputCls = (field: string) =>
    `w-full px-4 py-3.5 text-sm text-ow-950 bg-white border rounded-lg outline-none transition-all duration-200 placeholder:text-ow-400 ${
      focusedField === field
        ? "border-orange-500 ring-2 ring-orange-500/10"
        : errors[field as keyof FormValues]
        ? "border-red-400"
        : "border-ow-200 hover:border-ow-300"
    }`

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form header */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-ow-500 font-medium">Send a message</p>
        <span className="text-xs text-ow-400">* Required fields</span>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="First name *" error={errors.firstName?.message}>
            <input
              {...register("firstName")}
              className={inputCls("firstName")}
              placeholder="Ravi"
              autoComplete="given-name"
              onFocus={() => setFocusedField("firstName")}
              onBlur={() => setFocusedField(null)}
            />
          </FormField>
          <FormField label="Last name *" error={errors.lastName?.message}>
            <input
              {...register("lastName")}
              className={inputCls("lastName")}
              placeholder="Kumar"
              autoComplete="family-name"
              onFocus={() => setFocusedField("lastName")}
              onBlur={() => setFocusedField(null)}
            />
          </FormField>
        </div>

        <FormField label="Company *" error={errors.company?.message}>
          <input
            {...register("company")}
            className={inputCls("company")}
            placeholder="Precision Manufacturing Pvt. Ltd."
            autoComplete="organization"
            onFocus={() => setFocusedField("company")}
            onBlur={() => setFocusedField(null)}
          />
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Email *" error={errors.email ? "Enter a valid email address" : undefined}>
            <input
              {...register("email")}
              type="email"
              className={inputCls("email")}
              placeholder="ravi@company.com"
              autoComplete="email"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </FormField>
          <FormField label="Phone">
            <input
              {...register("phone")}
              type="tel"
              className={inputCls("phone")}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              onFocus={() => setFocusedField("phone")}
              onBlur={() => setFocusedField(null)}
            />
          </FormField>
        </div>

        <FormField label="Inquiry type *" error={errors.inquiry?.message}>
          <div className="relative">
            <select
              {...register("inquiry")}
              className={`${inputCls("inquiry")} appearance-none cursor-pointer pr-10`}
              defaultValue=""
              onFocus={() => setFocusedField("inquiry")}
              onBlur={() => setFocusedField(null)}
            >
              <option value="" disabled>
                Select inquiry type…
              </option>
              {inquiryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ow-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </FormField>

        <FormField label="Message *" error={errors.message?.message}>
          <textarea
            {...register("message")}
            rows={5}
            className={`${inputCls("message")} resize-y min-h-[120px]`}
            placeholder="Describe your bore requirement, attach a drawing reference, or ask a technical question…"
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
          />
        </FormField>
      </div>

      {/* Submit button */}
      <motion.div className="mt-8" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Sending…
            </span>
          ) : (
            "Send message"
          )}
        </Button>
      </motion.div>

      {/* Privacy note */}
      <p className="mt-4 text-xs text-ow-400 leading-relaxed">
        By submitting this form, you agree to our{" "}
        <a href="/privacy" className="text-orange-600 hover:underline">
          privacy policy
        </a>
        . We never share your information.
      </p>
    </motion.form>
  )
}
