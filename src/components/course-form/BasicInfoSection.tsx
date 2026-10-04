'use client'

import type React from "react"
import type { Category, Level } from "@/generated/prisma/client"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { CourseForm } from "@/components/course-form/types"

type Props = {
  form: CourseForm
  setForm: React.Dispatch<React.SetStateAction<CourseForm>>
}

export function BasicInfoSection({ form, setForm }: Props) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
        Basic Info
      </h2>

      <Field>
        <Label htmlFor="title">Course title</Label>
        <Input
          required
          id="title"
          name="title"
          placeholder="e.g. Full-Stack React & Node.js"
          className="h-10 rounded-xl border-gray-200 bg-white px-3 text-sm"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field>
          <Label htmlFor="category">Category</Label>
          <select
            id="category"
            name="category"
            className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
          >
            <option value="WebDev">WebDev</option>
            <option value="Design">Design</option>
            <option value="DataScience">DataScience</option>
            <option value="DevOps">DevOps</option>
            <option value="Mobile">Mobile</option>
          </select>
        </Field>

        <Field>
          <Label htmlFor="level">Level</Label>
          <select
            id="level"
            name="level"
            className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
            value={form.level}
            onChange={(e) => setForm({ ...form, level: e.target.value as Level })}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </Field>

        <Field>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min={0}
            placeholder="89"
            className="h-10 rounded-xl border-gray-200 bg-white px-3 text-sm"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })}
          />
        </Field>

        <Field>
          <Label htmlFor="duration">Total duration</Label>
          <Input
            required
            id="duration"
            name="duration"
            placeholder="42h"
            className="h-10 rounded-xl border-gray-200 bg-white px-3 text-sm"
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
          />
        </Field>

        <Field className="sm:col-span-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            required
            id="description"
            name="description"
            rows={3}
            placeholder="What will students learn in this course?"
            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Field>

        <Field className="sm:col-span-2">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            required
            id="imageUrl"
            name="imageUrl"
            type="url"
            placeholder="https://example.com/course-image.jpg"
            className="h-10 rounded-xl border-gray-200 bg-white px-3 text-sm"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
        </Field>
      </div>
    </section>
  )
}