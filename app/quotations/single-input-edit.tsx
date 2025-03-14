import { cn } from '@/lib/utils'
import React from 'react'

export function SingleInputEdit({
  onInputChange,
  value,
  type,
  name,
  as = 'input',
  className,
}: {
  onInputChange: (value: string) => void
  value: string | number
  type: React.HTMLInputTypeAttribute | undefined
  name?: string | undefined
  as?: 'input' | 'textarea'
  className?: React.HTMLAttributes<HTMLElement>['className']
}) {
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)
  const [isEditing, setIsEditing] = React.useState(false)
  const Component = as === 'input' ? 'input' : 'textarea'

  return (
    <div className={cn('relative', className)}>
      <div
        onClick={() => {
          setIsEditing(true)
          const end = String(value).length
          if (type !== 'number' && inputRef.current) {
            inputRef.current.setSelectionRange(end, end)
            inputRef.current.focus()
          }
        }}
        className={cn('cursor-pointer text-center', isEditing ? 'opacity-0' : 'opacity-100')}
      >
        {value}
      </div>
      <Component
        ref={inputRef}
        className={cn(
          'absolute inset-0 text-center bg-transparent p-0  outline-none resize-none',
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
