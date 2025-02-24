import { cn } from '@/lib/utils'
export function Logo({ size }: { size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }) {
  return (
    <div className="flex justify-center">
      <span
        className={
          'inline-flex  bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-2xl font-extrabold text-transparent'
        }
      >
        TELLAPP
      </span>
    </div>
  )
}
