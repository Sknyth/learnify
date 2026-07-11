'use client'

import { useUserStore } from '@/store/userStore'
import { useState } from 'react'

type User = {
	id: string
	name: string
	email: string
	createdAt: Date
	phone: string | null
	jobTitle: string | null
}


export default function ProfileForm({ user }: { user: User }) {
	const [name, setName] = useState(user.name)
	const [email, setEmail] = useState(user.email)
	const [phone, setPhone] = useState(user.phone ?? "")
	const [jobTitle, setJobTitle] = useState(user.jobTitle ?? "")
	const setUser = useUserStore((state) => state.setUser)
	const [error, setError] = useState("")

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError("")

		try {
			const res = await fetch("/api/profile", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, email, phone, jobTitle }),
			})

			const data = await res.json()

			if (!res.ok) {
				setError(data.error)
				return
			}

			setUser(data.user)
		} catch {
			setError("Something went wrong. Please try again.")
		}
	}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
			<div className="flex items-center justify-between">
				<div className="flex gap-4 items-center">
					<span className="flex items-center justify-center text-2xl font-bold bg-[#4338ca] text-white h-16 w-16 rounded-xl shrink-0">
						{user.name?.[0]?.toUpperCase() ?? "?"}
					</span>
					<div className="flex flex-col">
						<h1 className="font-bold text-xl">
							{user.name}
						</h1>
						<p className="text-gray-500 text-sm">
							Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
							})}
						</p>
					</div>
				</div>

				<button className="border border-gray-300 hover:border-gray-400 transition-colors text-sm font-bold px-4 py-2 rounded-xl shrink-0">
					Edit Photo
				</button>
			</div>

			<hr className="border-gray-200" />

			<div className="grid sm:grid-cols-2 gap-6">
				<div className="flex flex-col gap-2">
					<label htmlFor="name" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Full Name</label>
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="email" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="phone" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Phone</label>
					<input
						type="text"
						id="phone"
						name="phone"
						placeholder="e.g. +37369123456"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<label htmlFor="jobTitle" className="text-xs font-bold text-gray-400 uppercase tracking-wide">Job Title</label>
					<input
						type="text"
						id="jobTitle"
						name="jobTitle"
						placeholder="e.g. Frontend Engineer"
						value={jobTitle}
						onChange={(e) => setJobTitle(e.target.value)}
						className="bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] focus:border-transparent transition-all w-full"
					/>
				</div>
			</div>

			{error && <p className="text-red-500 text-sm">{error}</p>}
				
			<button type="submit" className="w-full sm:w-fit bg-[#4f46e5] hover:bg-[#4338ca] transition-colors text-white font-bold px-6 py-3 rounded-xl">
				Save Changes
			</button>
		</form>
	)
}
