'use client'

import AsideDashboard from '@/components/AsideDashboard'
import { Bell, Lock, Mail, Shield, Smartphone } from 'lucide-react'
import { useState } from 'react'

const notificationSettings = [
  {
    id: 'courseUpdates',
    title: 'Course updates',
    desc: 'Get notified when lessons, modules, or course materials are updated.',
    icon: Bell,
  },
  {
    id: 'emailDigest',
    title: 'Weekly email digest',
    desc: 'Receive a short summary of your course progress every week.',
    icon: Mail,
  },
  {
    id: 'mobileReminders',
    title: 'Learning reminders',
    desc: 'Show reminders when it is time to continue your learning plan.',
    icon: Smartphone,
  },
]

export default function Page() {
  const [settings, setSettings] = useState({
    courseUpdates: true,
    emailDigest: false,
    mobileReminders: true,
  })

  function toggleSetting(key: keyof typeof settings) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  return (
    <div className="flex min-h-screen">
      <AsideDashboard />

      <div className="py-8 sm:py-12 px-4 sm:px-8 lg:px-16 xl:px-24 flex flex-col mx-auto w-full gap-6 sm:gap-10">
        <div className="flex flex-col justify-start items-start">
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <h2 className="text-gray-500 text-sm sm:text-base">
            Manage your account preferences and security options.
          </h2>
        </div>

        <section className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 flex flex-col gap-5">
            <div>
              <h3 className="font-bold text-lg">Notifications</h3>
              <p className="text-sm text-gray-500">Choose what Learnify can send you.</p>
            </div>

            <div className="flex flex-col divide-y divide-gray-100">
              {notificationSettings.map((item) => {
                const Icon = item.icon
                const isEnabled = settings[item.id as keyof typeof settings]

                return (
                  <div key={item.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="rounded-xl bg-[#4f46e5]/10 w-10 h-10 items-center flex justify-center shrink-0">
                        <Icon className="text-[#4f46e5] w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-base">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-pressed={isEnabled}
                      onClick={() => toggleSetting(item.id as keyof typeof settings)}
                      className={`relative h-7 w-12 rounded-full transition-colors shrink-0 ${
                        isEnabled ? 'bg-[#4f46e5]' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                          isEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-emerald-500/10 w-10 h-10 items-center flex justify-center shrink-0">
                  <Shield className="text-emerald-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Account security</h3>
                  <p className="text-sm text-gray-500">Your account is protected.</p>
                </div>
              </div>

              <button className="border border-gray-300 hover:border-gray-400 transition-colors text-sm font-bold px-4 py-3 rounded-xl w-full sm:w-fit">
                Change Password
              </button>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-rose-500/10 w-10 h-10 items-center flex justify-center shrink-0">
                  <Lock className="text-rose-600 w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Danger zone</h3>
                  <p className="text-sm text-gray-500">Permanent account actions.</p>
                </div>
              </div>

              <button className="border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-colors text-sm font-bold text-rose-600 px-4 py-3 rounded-xl w-full sm:w-fit">
                Delete Account
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}