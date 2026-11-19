import {
  BookOpen,
  ChartNoAxesColumn,
  LayoutDashboard,
  Package,
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
  { href: '/dashboard/overview', label: 'Overview', icon: LayoutDashboard },
	{ href: '/dashboard/myLearning', label: 'My Learning', icon: BookOpen },
	{ href: '/dashboard/orders', label: 'Orders', icon: Package },
]

export const instructorNavItems: NavItem[] = [
  { href: '/instructor/overview', label: 'Overview', icon: LayoutDashboard },
]

export const adminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: ChartNoAxesColumn },
  { href: '/admin/courses', label: 'Courses', icon: BookOpen },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/sales', label: 'Sales', icon: TrendingUp },
]

export const workspaceNavItems = {
  student: dashboardNavItems,
  instructor: instructorNavItems,
  admin: adminNavItems,
}
