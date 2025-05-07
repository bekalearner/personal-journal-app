import { useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Button, Container, Logo } from '@/components/ui'
import { JournalItem, JournalForm } from '@/components/Journal/'
import { useJournal } from '@/contexts/Journal'

export const JournalView = () => {
  const { list, getList, resetCurrent, getItemById } = useJournal()
  useEffect(() => {
    getList()
  }, [getList])
  return (
    <Container className="flex py-36">
      <aside style={{ width: '30%' }}>
        <div className="flex flex-col px-24">
          <Logo />
          <Button
            appearance="primary"
            className="mt-24"
            Icon={Plus}
            onClick={() => resetCurrent()}
          >
            Новая запись
          </Button>
          <div className="flex text-white flex-col items-center gap-8 mt-24">
            {!list.length && 'Нет записей'}
            {!!list.length &&
              list.map((item) => (
                <JournalItem
                  item={item}
                  key={item.id}
                  onClick={() => {
                    getItemById(item.id)
                    console.log(item)
                  }}
                />
              ))}
          </div>
        </div>
      </aside>
      <main style={{ width: '70%' }}>
        <div className="px-24">
          <JournalForm />
        </div>
      </main>
    </Container>
  )
}
