import clsx from 'clsx'
import { forwardRef, useEffect, useRef, useState } from 'react'
import styles from './Input.module.css'

export const Input = forwardRef(
  ({ size = 'medium', label, id, Icon, className, ...props }, ref) => {
    const labelRef = useRef(null)
    const [inputLeftSpace, setInputLeftSpace] = useState(0)

    useEffect(() => {
      const el = labelRef.current
      if (!el) return

      const observer = new ResizeObserver(() => {
        setInputLeftSpace(
          el.offsetWidth < 80 ? el.offsetWidth : el.offsetWidth + 20
        )
      })

      observer.observe(el)
      return () => observer.disconnect()
    }, [])

    return (
      <div className="relative flex items-center text-white gap-24">
        <label
          ref={labelRef}
          className={clsx(
            styles.label,
            'absolute left-0 text-secondary-20 flex items-center gap-8 font-medium',
            // Label Size
            size === 'small' && 'text-sm',
            size === 'medium' && 'text-base',
            size === 'large' && 'text-lg',
            !Icon && 'pl-8'
          )}
          htmlFor={id}
        >
          {Icon && <Icon size={size === 'small' ? '16px' : '18px'} />}
          {label ? label : ''}
        </label>
        <input
          ref={ref}
          className={clsx(
            styles.input,
            className,
            'w-full text-white border-0 border-b border-secondary-70 bg-secondary-90',
            // Input Size
            {
              'text-sm px-12 py-12': size === 'small',
              'text-base px-16 py-16': size === 'medium',
              'text-lg px-20 p-20': size === 'large',
            }
          )}
          style={{
            paddingLeft: label ? inputLeftSpace : Icon ? '24px' : '16px',
          }}
          id={id}
          {...props}
        />
      </div>
    )
  }
)
