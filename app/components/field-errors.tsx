import type { FieldErrorsProps } from '@/types'
export function FieldErrors({ errors, name }: FieldErrorsProps) {
  if (!errors[name]) {
    return null
  }
  return <div className="text-destructive ">{errors[name][0]}</div>
}
