import { NotebookText } from 'lucide-react'

export const Logo = ({ size = '24px' }) => {
  return (
    <div
      className="flex text-white items-center gap-8"
      style={{ fontSize: size }}
    >
      <NotebookText size={size} />
      Personal journal
    </div>
  )
}
