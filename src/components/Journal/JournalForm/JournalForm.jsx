import { useState, useEffect, useMemo } from 'react'
import { Calendar, Tag } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'
import { useJournal } from '@/contexts/Journal/index.js'

export const JournalForm = () => {
  const { current, addItem, updateItem, resetCurrent, removeItem } =
    useJournal()

  const [formData, setFormData] = useState({
    title: '',
    date: new Date().toISOString().slice(0, 10),
    tag: '',
    body: '',
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (current) {
      setFormData({
        title: current.title || '',
        date: new Date(current.date).toISOString().slice(0, 10),
        tag: current.tag || '',
        body: current.body || '',
      })
    } else {
      setFormData({
        title: '',
        date: new Date().toISOString().slice(0, 10),
        tag: '',
        body: '',
      })
    }
  }, [current])

  const notSame = useMemo(() => {
    const fields = ['title', 'date', 'tag', 'body']

    if (!current) return true

    return fields.some((field) => current?.[field] !== formData[field])
  }, [current, formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.'
    }
    if (!formData.date) {
      newErrors.date = 'Date is required.'
    }
    if (!formData.body.trim()) {
      newErrors.body = 'Content is required.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validate()) return

    if (current) {
      updateItem(current.id, formData)
    } else {
      addItem({ ...formData, id: new Date().getTime() })
      setFormData({
        title: '',
        date: new Date().toISOString().slice(0, 10),
        tag: '',
        body: '',
      })
    }
    resetCurrent()
  }

  const handleDelete = () => {
    if (current) {
      removeItem(current.id)
      resetCurrent()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-16">
      <Input
        value={formData.title}
        onChange={handleChange}
        size="large"
        type="text"
        id="title"
        name="title"
        placeholder="Введите заголовок..."
        error={errors.title}
      />
      <div className="flex flex-col">
        <Input
          value={formData.date}
          onChange={handleChange}
          size="small"
          type="date"
          id="date"
          name="date"
          label="Дата"
          Icon={Calendar}
          error={errors.date}
        />
        <Input
          value={formData.tag}
          onChange={handleChange}
          size="small"
          type="text"
          id="tag"
          name="tag"
          label="Метка"
          Icon={Tag}
          placeholder="Введите метку..."
        />
      </div>
      <Textarea
        value={formData.body}
        onChange={handleChange}
        rows={20}
        name="body"
        placeholder="Введите описание"
        error={errors.body}
      />
      <div className="flex gap-16">
        {notSame && <Button type="submit">Сохранить запись</Button>}
        {current && (
          <Button appearance="danger" type="button" onClick={handleDelete}>
            Удалить запись
          </Button>
        )}
      </div>
    </form>
  )
}
