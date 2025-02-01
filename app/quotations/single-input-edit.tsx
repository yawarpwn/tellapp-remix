import { cn } from '@/lib/utils'
import React from 'react'

export function SingleInputEdit({
  onInputChange,
  value,
  type,
  name,
  className,
}: {
  onInputChange: (value: string) => void
  value: string | number
  type: React.HTMLInputTypeAttribute | undefined
  name: string | undefined
  className?: React.HTMLAttributes<HTMLElement>['className']
}) {
  const [isEditing, setIsEditing] = React.useState(false)

  return (
    <div className={cn(' h-full relative', className)}>
      <input
        className={cn(
          'absolute inset-0 text-center bg-muted border-none outline-none',
          !isEditing && 'hidden'
        )}
        type={type}
        onChange={(ev) => onInputChange(ev.target.value)}
        name={name}
        value={value}
        onBlur={() => setIsEditing(false)}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            setIsEditing(false)
          }
        }}
      />
      <div
        onClick={() => setIsEditing(true)}
        className={cn(
          'absolute flex justify-center inset-0',
          isEditing && 'hidden'
        )}
      >
        <p>{value}</p>
      </div>
    </div>
  )
}
