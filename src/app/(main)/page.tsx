import CoursesList from '@/components/CoursesList'
import HowItWorks from '@/components/HowItWorks'
import Review from '@/components/Review'
import { Star, Zap } from 'lucide-react'
import Image from 'next/image'


export default async function Home() {
  
  return (
    <main className="flex min-h-screen flex-col justify-between relative">
      <div className="absolute inset-0 bg-linear-to-br from-[#eef2ff] via-white to-[#f8f9fc] -z-10" />

      <section className="flex flex-col items-start justify-center gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-24 pb-16 sm:pb-24 py-4 px-8 sm:px-12 lg:px-24">
        <div className="text-[#4f46e5] flex items-center gap-2 text-sm font-bold tracking-wide bg-[#eef2ff] rounded-lg px-4 py-2 w-fit">
          <Zap className="w-4 h-4" /> New: AI-powered learning paths →
        </div>

        <h1 className="text-4xl sm:text-7xl font-bold text-gray-900 leading-tight">
          Learn modern skills.
          <br />
          <span className="text-[#4f46e5]">
            Build real projects.
          </span>
        </h1>

        <p className="text-gray-600 text-lg sm:text-xl max-w-xl">
          Join 240,000 learners mastering in-demand skills with project-based courses taught by industry practitioners — not academics.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 lg:gap-6 mt-2 w-full sm:w-auto">
          <a href="#" className="text-sm sm:text-base font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-colors rounded-lg px-6 py-3 text-center">
            Start Learning →
          </a>
          <a href="#" className="text-sm sm:text-base font-bold text-gray-600 border border-gray-300 hover:border-gray-400 hover:shadow-sm transition-all rounded-lg px-6 py-3 text-center">
            Browse Courses
          </a>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mt-4">
          <div className="flex items-center -space-x-2">
            <Image src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&auto=format" width={32} height={32} alt="Learner avatar" className="w-8 h-8 rounded-full ring-2 ring-white" />
            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&auto=format" width={32} height={32} alt="Learner 2" className="w-8 h-8 rounded-full ring-2 ring-white" />
            <Image src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=32&h=32&fit=crop&auto=format" width={32} height={32} alt="Learner 3" className="w-8 h-8 rounded-full ring-2 ring-white" />
            <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&auto=format" width={32} height={32} alt="Learner 4" className="w-8 h-8 rounded-full ring-2 ring-white" />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-0.5">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            </div>
            <span className="font-bold text-sm">4.9/5</span>
            <span className="text-gray-600 text-sm">from 18,400 reviews</span>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 bg-white border border-gray-200 p-8 sm:p-12 lg:p-16">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold">240k+</h1>
          <p className="text-gray-600 text-sm text-center">
            Active Students
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold">500+</h1>
          <p className="text-gray-600 text-sm text-center">
            Expert Courses
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold">98%</h1>
          <p className="text-gray-600 text-sm text-center">
            Satisfaction Rate
          </p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl sm:text-4xl font-bold">82%</h1>
          <p className="text-gray-600 text-sm text-center">
            Career Outcome
          </p>
        </div>
      </section>

      <section className="flex flex-col items-start justify-center gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-24 py-4 px-8 sm:px-12 lg:px-24">
        <div className="flex flex-col gap-2 w-full">
          <h2 className="uppercase text-[#4f46e5] font-bold">Courses</h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 w-full font-bold">
            <h1 className="text-2xl sm:text-4xl">Most popular right now</h1>
            <a className="text-[#4f46e5] group shrink-0" href="#">
              <span className="inline-block transition-transform group-hover:-translate-x-1">View all</span> →
            </a>
          </div>
        </div>

        <CoursesList />

      </section>

      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-24 py-12 px-8 sm:py-16 sm:px-12 lg:px-24 bg-white border border-gray-200 w-full">
        <div className="flex flex-col gap-2 w-full max-w-3xl text-center">
          <h2 className="uppercase text-[#4f46e5] font-bold">Process</h2>
          <h1 className="text-3xl sm:text-4xl font-bold">How Learnify works</h1>
          <HowItWorks />
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-6 sm:gap-8 py-12 px-8 sm:py-16 sm:px-12 lg:px-24 w-full">
        <div className="flex flex-col gap-2 w-full text-center">
          <h2 className="uppercase text-[#4f46e5] font-bold">Testimonials</h2>
          <h1 className="text-3xl sm:text-4xl font-bold">From learners like you</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 w-full mt-8">
            <Review />
            <Review />
            <Review />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-24 py-12 px-8 sm:py-16 sm:px-12 lg:px-24 bg-[#4f46e5] text-white w-full rounded-3xl">
          <div className="flex flex-col gap-2 w-full max-w-3xl text-center">
            <h2 className="uppercase text-white font-bold">Get started</h2>
            <h1 className="text-3xl sm:text-4xl font-bold">Start learning today</h1>
            <p className="text-white text-base sm:text-xl max-w-xl mx-auto">
              Join 240,000 learners mastering in-demand skills with project-based courses taught by industry practitioners — not academics.
            </p>
            <a href="#" className="text-sm sm:text-base font-bold text-[#4f46e5] bg-white hover:bg-gray-100 transition-colors rounded-lg px-6 py-3 mt-4 inline-block mx-auto">
              Start Learning →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}