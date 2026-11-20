import type { ComponentProps } from 'react'
import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'button'> & {
  pending: boolean
  pendingLabel: string
  iconOnly?: boolean
}

export function PendingButton({
  pending,
  pendingLabel,
  iconOnly,
  children,
  className,
  disabled,
  type = 'button',
  ...props
}: Props) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || pending}
      aria-busy={pending || undefined}
      aria-label={pending ? pendingLabel : props['aria-label']}
      title={pending ? pendingLabel : props.title}
      className={cn(
        'inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
    >
      {pending ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-[1em] shrink-0 motion-safe:animate-spin" />
          {!iconOnly && pendingLabel}
        </>
      ) : children}
    </button>
  )
}
