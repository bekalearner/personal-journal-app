import styles from './Container.module.css'
import clsx from 'clsx'

export const Container = ({ children, className, ...props }) => {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      {children}
    </div>
  )
}
