import { useState, useCallback, useMemo } from 'react'
import { journalService } from '@/services/Journal.service.js'
import { JournalContext } from './JournalContext'

export const JournalProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [current, setCurrent] = useState(null)

  const getList = useCallback(() => {
    setList(journalService.getList())
  }, [])

  const getItemById = useCallback((id) => {
    setCurrent(journalService.getItemById(id))
  }, [])

  const addItem = useCallback(
    (item) => {
      journalService.addItem(item)
      getList()
    },
    [getList]
  )

  const removeItem = useCallback(
    (id) => {
      journalService.removeItem(id)
      getList()
    },
    [getList]
  )

  const updateItem = useCallback(
    (id, item) => {
      journalService.updateItem(id, item)
      getList()
    },
    [getList]
  )

  const reloadList = useCallback(() => {
    getList()
  }, [getList])

  const reloadCurrent = useCallback(() => {
    if (current && current.id) {
      getItemById(current.id)
    }
  }, [current, getItemById])

  const resetCurrent = useCallback(() => {
    setCurrent(null)
  }, [])

  const resetList = useCallback(() => {
    setList([])
  }, [])

  const resetAll = useCallback(() => {
    resetList()
    resetCurrent()
  }, [resetList, resetCurrent])

  const value = useMemo(
    () => ({
      list,
      current,
      getList,
      getItemById,
      addItem,
      removeItem,
      updateItem,
      reloadList,
      reloadCurrent,
      resetCurrent,
      resetList,
      resetAll,
    }),
    [
      list,
      current,
      getList,
      getItemById,
      addItem,
      removeItem,
      updateItem,
      reloadList,
      reloadCurrent,
      resetCurrent,
      resetList,
      resetAll,
    ]
  )

  return (
    <JournalContext.Provider value={value}>{children}</JournalContext.Provider>
  )
}
