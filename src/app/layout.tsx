import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getCurrentUser } from '@/lib/getCurrentUser'
import UserStoreInitializer from '@/components/UserStoreInitializer'
import CoursesStoreInitializer from '@/components/CoursesStoreInitializer'
import { prisma } from '@/lib/prisma'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Learnify",
  description: "Courses",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser()
  const courses = await prisma.course.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <html lang="en" className={cn("h-full", "antialiased", inter.variable, "font-sans")}>
      <body className="min-h-full flex flex-col font-sans">
        <UserStoreInitializer user={user} />
        <CoursesStoreInitializer courses={courses} />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            unstyled: true,
            classNames: {
              toast:
                'flex w-full min-w-0 items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-lg',
              content: 'min-w-0 flex-1',
              title: 'text-sm font-semibold text-gray-800',
              description: 'text-xs text-gray-400',
              actionButton:
                'shrink-0 whitespace-nowrap cursor-pointer rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-indigo-700',
              cancelButton:
                'shrink-0 whitespace-nowrap cursor-pointer rounded-xl bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-200',
              success: '!border-green-200 !bg-green-50 text-green-700',
              error: '!border-red-200 !bg-red-50 text-red-700',
            },
          }}
        />
      </body>
    </html>
  );
}