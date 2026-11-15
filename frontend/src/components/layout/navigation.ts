import {
  BookOpen,
  ChartNoAxesColumn,
  Settings,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  href: string
  label: string
  icon?: LucideIcon
}

export const primaryNavItems: NavItem[] = [
  { href: '/courses', label: 'Courses' },
]

export const dashboardNavItems: NavItem[] = [
  { href: '/dashboard/myCourses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/profile', label: 'Profile', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export const adminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: ChartNoAxesColumn },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/sales', label: 'Sales', icon: TrendingUp },
]
