"use client"

import { useEffect } from "react"
import { useUserStore } from "@/store/userStore"

type User = {
  id: string
  name: string
  email: string
  phone: string | null
  jobTitle: string | null
  createdAt: Date
} | null

export default function UserStoreInitializer({ user }: { user: User }) {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    setUser(user)
  }, [user, setUser])

  return null
}