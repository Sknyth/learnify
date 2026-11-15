type Props = {
  title: string
  count: number
  desc: string
}

export default function InfoBoxSales({ title, count, desc }: Props) {
  return (
    <div className="bg-white border rounded-2xl p-4 sm:p-6 gap-1 flex flex-col">
      <p className="text-xs sm:text-sm text-gray-400 p-0 m-0 uppercase font-bold truncate">{title}</p>
      <h1 className="font-bold text-2xl sm:text-3xl truncate">
        ${count.toLocaleString('en-US', { maximumFractionDigits: 2 })}
      </h1>
      <p className="text-xs sm:text-sm text-gray-400 p-0 m-0 truncate">{desc}</p>
    </div>
  )
}