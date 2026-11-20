'use client'

import { PendingButton } from '@/components/ui/pending-button'
import { Button } from "@/components/ui/button"
import { DialogClose } from "@/components/ui/dialog"

type Props = {
  isEditing: boolean
  isPending: boolean
  isLoading: boolean
  lessonsTotal: number
  modulesTotal: number
}

export function CourseFormFooter({ isEditing, isPending, isLoading, lessonsTotal, modulesTotal }: Props) {
  return (
    <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <span className="text-xs text-gray-400">
        {modulesTotal} modules · {lessonsTotal} lessons
      </span>
      <div className="flex items-center gap-3">
        <DialogClose
          render={
            <Button
              variant="outline"
              className="h-10 flex-1 cursor-pointer rounded-xl px-5 font-semibold text-gray-500 hover:bg-gray-100 sm:flex-none"
            >
              Cancel
            </Button>
          }
        />
        <PendingButton
          pending={isPending}
          pendingLabel={isLoading ? "Loading course…" : isEditing ? "Saving…" : "Publishing…"}
          type="submit"
          form="course-form"
          className="h-10 flex-1 cursor-pointer whitespace-nowrap rounded-xl bg-indigo-600 px-6 font-bold text-white transition-colors hover:bg-indigo-700 sm:flex-none"
        >
          {isEditing ? 'Save Changes' : 'Publish Course'}
        </PendingButton>
      </div>
    </div>
  )
}