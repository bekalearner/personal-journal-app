import clsx from 'clsx'
import { forwardRef } from 'react'
import styles from './Textarea.module.css'

export const Textarea = forwardRef(
  ({ size = 'medium', className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          styles.textarea,
          className,
          'min-w-full max-w-full text-white border-0 border-b border-secondary-70 bg-secondary-90',
          // Input Size
          {
            'text-sm px-12 py-12': size === 'small',
            'text-base px-16 py-16': size === 'medium',
            'text-lg px-20 p-20': size === 'large',
          }
        )}
        {...props}
      />
    )
  }
)
