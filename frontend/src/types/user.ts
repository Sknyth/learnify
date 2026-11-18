export type Role = 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'

export interface UserDto {
  id: string
  name: string
  email: string
  role: Role
  createdAt: Date
  enrollments: { id: string }[]
  phone: string | null
  jobTitle: string | null
}