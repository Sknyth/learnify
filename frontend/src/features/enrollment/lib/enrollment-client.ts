export async function enrollInCourse(courseId: string) {
  const res = await fetch('/api/enrollment/enroll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ courseId }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.error ?? 'Failed to enroll')
  }

  return data
}
