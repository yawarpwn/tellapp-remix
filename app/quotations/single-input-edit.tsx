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
        onClick={() => {
          setIsEditing(true)
          const end = String(value).length
          if (type !== 'number' && inputRef.current) {
            inputRef.current.setSelectionRange(end, end)
            inputRef.current.focus()
          }
        }}
        className={cn('flex cursor-pointer border justify-center', isEditing && 'hidden')}
      >
        {value}
      </div>
      <input
        ref={inputRef}
        className={cn(
          'absolute inset-0 text-center bg-transparent outline-none outline-1 outline-primary',
          isEditing ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        type={type}
        name={name}
        value={value}
        onChange={(ev) => onInputChange(ev.target.value)}
        onBlur={(ev) => {
          setIsEditing(false)
        }}
        onKeyDown={(ev) => {
          const keyPressed = ev.key
          const currentElement = ev.target as HTMLInputElement
          if (keyPressed === 'Enter') {
            currentElement.blur()
          }

          if (keyPressed === 'Escape') {
            currentElement.blur()
          }
        }}
      />
    </div>
  )
}
