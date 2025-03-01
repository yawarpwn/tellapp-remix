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
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = React.useState(false)

  return (
    <div className={cn(' h-full relative', className)}>
      <div
        onDoubleClick={() => {
          setIsEditing(true)
          const end = String(value).length
          if (type !== 'number' && inputRef.current) {
            inputRef.current.setSelectionRange(end, end)
            inputRef.current.focus()
          }
        }}
        className={cn('flex cursor-pointer justify-center', isEditing && 'hidden')}
      >
        {value}
      </div>
      <input
        ref={inputRef}
        className={cn(
          'absolute inset-0 text-center bg-transparent outline-none outline-primary',
          isEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        type={type}
        onChange={(ev) => onInputChange(ev.target.value)}
        name={name}
        value={value}
        onBlur={() => {
          console.log('blur')
          setIsEditing(false)
        }}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') {
            setIsEditing(false)
          }
        }}
      />
    </div>
  )
}
