"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"

type Slide = {
  title: string
  description: string
  stats?: { value: string; label: string }[]
}

const SLIDES: Slide[] = [
  {
    title: "Realtime collaboration",
    description: "Work together seamlessly across projects and teams.",
    stats: [
      { value: "99.9%", label: "Uptime" },
      { value: "4.9/5", label: "Rating" },
      { value: "+1k", label: "Teams" },
    ],
  },
  {
    title: "Secure by default",
    description: "SSO, 2FA, and SOC 2 Type II compliant infrastructure.",
    stats: [
      { value: "AES-256", label: "Encryption" },
      { value: "ISO 27001", label: "Aligned" },
      { value: "GDPR", label: "Ready" },
    ],
  },
  {
    title: "Insightful dashboards",
    description: "Beautiful reports for confident, fast decisions.",
    stats: [
      { value: "12+", label: "Templates" },
      { value: "1m+", label: "Events/day" },
      { value: "<200ms", label: "Latency" },
    ],
  },
]

export default function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Slider state
  const [index, setIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 3000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const dx = e.changedTouches[0].clientX - touchStartX.current
    const threshold = 50
    if (dx > threshold) {
      setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
    } else if (dx < -threshold) {
      setIndex((i) => (i + 1) % SLIDES.length)
    }
    touchStartX.current = null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    try {
      await new Promise((r) => setTimeout(r, 900))
      if (email === "admin@opura.ai" && password === "password") {
        localStorage.setItem("isAuthenticated", "true")
        router.push("/admin-config")
      } else {
        setError("Invalid email or password")
      }
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(80%_60%_at_50%_-10%,#eef2ff_0%,#ffffff_45%)]">
      {/* top accent line */}
      {/* <div className="h-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" /> */}

      <div className="mx-auto grid min-h-[calc(100vh-4px)] max-w-6xl grid-cols-1 gap-8 p-4 md:grid-cols-2 md:items-center">
        {/* Left: Auth Card */}
        <div className="order-2 md:order-1 relative">
          {/* Absolute brand row (no longer changes layout height) */}
          <div className="pointer-events-none absolute -top-16 left-0 flex items-center gap-1">
            <div className="relative h-15 w-15 overflow-hidden rounded-lg ring-slate-200 bg-white">
              <Image
                src="/icons/opura-logo.png"
                alt="Logo"
                fill
                sizes="36px"
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="text-l font-semibold tracking-tight text-slate-800">
              Opura Admin
            </span>
          </div>

          {/* Card with extra top padding to avoid overlap with absolute brand row */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-20px_rgba(2,6,23,0.08)]">
            {/* subtle top sheen */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            <div className="p-6 sm:p-11">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Sign in
                </h1>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-xs font-medium tracking-wide text-slate-700"
                  >
                    Email
                  </label>
                  <div className="group relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-600" />
                    <input
                      id="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-medium tracking-wide text-slate-700"
                  >
                    Password
                  </label>
                  <div className="group relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-slate-600" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-violet-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                    {error}
                  </div>
                )}

                {/* Primary CTA */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-sky-100 disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Continue"
                  )}
                </button>

                {/* Helper links */}
                <div className="flex items-center justify-between text-sm">
                  <a className="text-sky-700 hover:text-sky-800" href="#">
                    Forgot password?
                  </a>
                  <a className="text-slate-600 hover:text-slate-800" href="#">
                    Create account
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right: Slider Panel (keeps corner gradient accents) */}
        <div className="order-1 md:order-2">
          <div
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-0 shadow-[0_25px_80px_-30px_rgba(2,6,23,0.12)]"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Mesh gradient backdrop (kept) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-70 [background:radial-gradient(120%_60%_at_10%_10%,#dbeafe_0%,transparent_40%),radial-gradient(100%_60%_at_90%_20%,#f5d0fe_0%,transparent_35%),radial-gradient(120%_80%_at_50%_110%,#cffafe_0%,transparent_35%)]"
            />
            {/* Corner gradient shapes (kept) */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rotate-6 rounded-3xl bg-gradient-to-br from-indigo-500/15 to-fuchsia-500/15 blur-xl" />
            <div className="pointer-events-none absolute -left-8 -bottom-8 h-32 w-32 -rotate-6 rounded-3xl bg-gradient-to-br from-cyan-400/15 to-indigo-400/15 blur-xl" />

            {/* Slides */}
            <div className="relative h-full">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {SLIDES.map((slide, i) => (
                  <section
                    key={i}
                    className="min-w-full px-6 py-8 sm:px-8 sm:py-10"
                    aria-roledescription="slide"
                    aria-label={slide.title}
                  >
                    {/* Header (small logo + tagline) */}
                    <div className="mb-6 flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-white">
                        <Image
                          src="/icons/opura-logo.png"
                          alt="Logo"
                          fill
                          sizes="40px"
                          className="object-contain p-1.5"
                          priority
                        />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          Opura Product
                        </div>
                        <div className="text-xs text-slate-500">
                          Modern tools for teams that ship
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900">
                      {slide.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      {slide.description}
                    </p>

                    {slide.stats && (
                      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                        {slide.stats.map((s, si) => (
                          <div
                            key={si}
                            className="rounded-xl border border-slate-200 bg-white p-3"
                          >
                            <div className="text-xl font-semibold text-slate-900">
                              {s.value}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {s.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4 backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                        <p className="text-sm text-slate-700">
                          SOC 2 Type II compliant infrastructure
                        </p>
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {/* Dots */}
              <div className="mb-5 mt-3 flex items-center justify-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 w-2 rounded-full transition ${index === i
                        ? "bg-slate-900"
                        : "bg-slate-300 hover:bg-slate-400"
                      }`}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 bg-white/90 backdrop-blur border-t" style={{color:"#ededed"}}>
  <div className="container mx-auto px-4 py-3 text-center text-sm">
    <a href="/privacy-policy" className="underline underline-offset-4"  style={{color:"#171717"}}>
      Privacy Policy
    </a>
  </div>
</div>
    </div>
    
  )
}
