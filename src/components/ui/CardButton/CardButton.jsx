import clsx from 'clsx'
import styles from './CardButton.module.css'

export const CardButton = ({
  size = 'medium',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        className,
        'text-white border rounded-md bg-secondary-80 border-secondary-80 w-full',
        styles['card-button'],
        {
          //Size
          'p-16': size === 'small',
          'p-20': size === 'medium',
          'p-24': size === 'large',
        }
      )}
      {...props}
    >
      {children}
    </button>
  )
}
