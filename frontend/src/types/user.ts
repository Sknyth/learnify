export type Role = 'USER' | 'ADMIN'

export interface UserDto {
  id: string
  name: string | null
  email: string
  role: Role
  createdAt: Date
  enrollments: { id: string }[]
}