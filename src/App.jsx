import { JournalView } from '@/views/JournalView'
import { JournalProvider } from '@/contexts/Journal'
function App() {
  return (
    <>
      <JournalProvider>
        <JournalView />
      </JournalProvider>
    </>
  )
}

export default App
