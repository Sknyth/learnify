import type { LucideIcon } from 'lucide-react'

type Props = {
  Icon: LucideIcon
  count: number
  desc: string
  isMoney?: boolean
}

export default function InfoBoxDashboard({ Icon, count, desc, isMoney }: Props) {
  return (
    <div className="bg-white border rounded-2xl p-6 gap-5 flex flex-col">
      <div className="rounded-3xl bg-[#4f46e5]/10 w-9 h-9 items-center flex justify-center">
        <Icon className="text-[#4f46e5] w-5 h-5" />
      </div>

      <div>
        <h1 className="font-bold text-2xl">
          {isMoney && "$"}
          {count.toLocaleString('en-US', { maximumFractionDigits: 2 })}
        </h1>
        <p className="text-sm text-gray-500 p-0 m-0">{desc}</p>
      </div>
    </div>
  )
}