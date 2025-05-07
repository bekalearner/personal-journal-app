import { CardButton } from '@/components/ui/index.js'
import { useCallback } from 'react'

export const JournalItem = ({ item, onClick }) => {
  const formatDate = useCallback((date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }, [])

  return (
    <CardButton onClick={onClick}>
      <div className="flex flex-col gap-16">
        <h2 className="text-white text-lg font-medium text-left">
          {item.title}
        </h2>
        <div className="flex ite gap-8">
          <span className="text-sm text-secondary-50">
            {formatDate(item.date)}
          </span>
          <p className="text-sm text-secondary-40 text-left truncate">
            {item.body}
          </p>
        </div>
      </div>
    </CardButton>
  )
}
