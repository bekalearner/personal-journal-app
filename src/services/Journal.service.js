class JournalService {
  getList(userId) {
    const data = localStorage.getItem('journalList')
    if (!data) return []
    if (userId) {
      return JSON.parse(data).filter((item) => item.userId === userId)
    }
    return JSON.parse(data)
  }

  getItemById(id) {
    const data = localStorage.getItem('journalList')
    if (!data) return {}
    return JSON.parse(data).find((item) => item.id === id)
  }

  addItem(item) {
    const data = localStorage.getItem('journalList')
    if (!data) {
      localStorage.setItem('journalList', JSON.stringify([item]))
      return
    }
    const journalList = JSON.parse(data)
    journalList.push(item)
    localStorage.setItem('journalList', JSON.stringify(journalList))
  }

  removeItem(id) {
    const data = localStorage.getItem('journalList')
    if (!data) return
    const journalList = JSON.parse(data)
    localStorage.setItem(
      'journalList',
      JSON.stringify(journalList.filter((item) => item.id !== id))
    )
  }

  updateItem(id, item) {
    const data = localStorage.getItem('journalList')
    if (!data) return
    const journalList = JSON.parse(data)
    const index = journalList.findIndex((item) => item.id === id)
    if (index !== -1) {
      journalList[index] = item
      localStorage.setItem('journalList', JSON.stringify(journalList))
    }
  }
}

export const journalService = new JournalService()
