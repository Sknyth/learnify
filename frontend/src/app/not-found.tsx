import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative isolate grid flex-1 place-items-center overflow-hidden bg-white px-6 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,var(--color-indigo-100),transparent_70%)]"
      />

      <div className="mx-auto w-full max-w-lg text-center">
        <p aria-hidden="true" className="text-[clamp(6rem,20vw,11rem)] leading-none font-black tracking-tighter text-indigo-200">
          404
        </p>
        <h1 id="not-found-title" className="mt-5 text-3xl font-bold tracking-tight text-gray-950 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-600">
          The page you’re looking for may have moved. You can return home or explore the course catalog.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to home
          </Link>
          <Link
            href="/courses"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Browse courses
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
