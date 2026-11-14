import AsideDashboard from '@/features/dashboard/components/AsideDashboard'
import SettingsContent from '@/features/dashboard/components/SettingsContent'

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <AsideDashboard />
      <SettingsContent />
    </div>
  )
}
