import clsx from 'clsx'
import styles from './Button.module.css'

export const Button = ({
  appearance = 'primary',
  size = 'medium',
  fullsize = false,
  Icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        className,
        'text-white flex items-center justify-center gap-6 font-medium border rounded-md',
        styles.button,
        {
          // Appearance
          'bg-primary-50 border-primary-50': appearance === 'primary',
          'bg-secondary-50 border-secondary-50': appearance === 'secondary',
          'bg-success-50 border-success-50': appearance === 'success',
          'bg-danger-50 border-danger-50': appearance === 'danger',
          'bg-warning-50 border-warning-50': appearance === 'warning',
          'bg-info-50 border-info-50': appearance === 'info',
          //Size
          'text-sm px-12 py-6': size === 'small',
          'text-base px-16 py-8': size === 'medium',
          'text-lg px-20 py-12': size === 'large',
          //Fullsize
          'block w-full': fullsize,
        }
      )}
      {...props}
    >
      {Icon && <Icon size={size === 'small' ? '16px' : '18px'} />}
      <span>{children}</span>
    </button>
  )
}
