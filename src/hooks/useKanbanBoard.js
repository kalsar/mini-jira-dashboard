import { useEffect, useMemo, useState } from 'react'
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { COLUMNS, EMPTY_FORM, SAMPLE_BOARD, STORAGE_KEY } from '../constants/board'
import { cloneBoard, filterBoard, findColumnIdByTaskId } from '../utils/board'

function useKanbanBoard() {
  const [board, setBoard] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return SAMPLE_BOARD

    try {
      const parsed = JSON.parse(stored)
      if (!parsed.todo || !parsed.inProgress || !parsed.done) return SAMPLE_BOARD
      return parsed
    } catch {
      return SAMPLE_BOARD
    }
  })

  // states for filter and modal
  const [searchQuery, setSearchQuery] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [isDarkMode, setIsDarkMode] = useState(false)

  const [modalMode, setModalMode] = useState(null)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [activeTaskId, setActiveTaskId] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [titleError, setTitleError] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board))
  }, [board])

  const filteredBoard = useMemo(
    () => filterBoard(board, searchQuery, priorityFilter),
    [board, priorityFilter, searchQuery],
  )
  const activeTask = useMemo(
    () =>
      [...board.todo, ...board.inProgress, ...board.done].find(
        (task) => task.id === activeTaskId,
      ) || null,
    [activeTaskId, board],
  )

  // reset all filed 
  function resetModalState() {
    setModalMode(null)
    setEditingTaskId(null)
    setForm(EMPTY_FORM)
    setTitleError('')
  }

  // for open add modal

  function openAddModal() {
    setForm(EMPTY_FORM)
    setTitleError('')
    setModalMode('add')
  }

  // open edit modal  of particular task
  function openEditModal(task) {
    const status = COLUMNS.find((column) =>
      board[column.id].some((item) => item.id === task.id),
    )?.id

    if (!status) return

    setForm({
      ...task,
      status,
    })
    setEditingTaskId(task.id)
    setTitleError('')
    setModalMode('edit')
  }

  function handleFormChange(event) {
    const { name, value } = event.target
    if (name === 'title' && value.trim()) {
      setTitleError('')
    }
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function findColumn(taskId, sourceBoard = board) {
    return findColumnIdByTaskId(taskId, sourceBoard)
  }

  function findContainer(id) {
    if (COLUMNS.some((column) => column.id === id)) return id
    return findColumn(id)
  }
// form submit 

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.title.trim()) {
      setTitleError('Title is required.')
      return
    }

    if (modalMode === 'add') {
      const newTask = {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        assignee: form.assignee.trim(),
        dueDate: form.dueDate,
      }
      setBoard((prev) => ({
        ...prev,
        todo: [newTask, ...prev.todo],
      }))
      resetModalState()
      return
    }

    if (!editingTaskId) return

    const originalStatus = findColumn(editingTaskId)
    if (!originalStatus) return

    const updatedTask = {
      id: editingTaskId,
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      assignee: form.assignee.trim(),
      dueDate: form.dueDate,
    }

    setBoard((prev) => {
      const next = cloneBoard(prev)
      next[originalStatus] = next[originalStatus].filter(
        (task) => task.id !== editingTaskId,
      )
      next[form.status] = [updatedTask, ...next[form.status]]
      return next
    })

    resetModalState()
  }

  //Delete task 

  function handleDelete() {
    if (!editingTaskId) return
    if (!window.confirm('Delete this task?')) return

    setBoard((prev) => {
      const columnId = findColumn(editingTaskId, prev)
      if (!columnId) return prev

      const next = cloneBoard(prev)
      next[columnId] = next[columnId].filter((task) => task.id !== editingTaskId)
      return next
    })
    resetModalState()
  }

  function handleDragEnd(event) {
    setActiveTaskId(null)

    const { active, over } = event
    if (!over) return

    const activeContainer = findContainer(active.id)
    const overContainer = findContainer(over.id)

    if (!activeContainer || !overContainer) return

    if (activeContainer === overContainer) {
      setBoard((prev) => {
        const items = prev[activeContainer]
        const oldIndex = items.findIndex((task) => task.id === active.id)
        const overIndex =
          over.id === overContainer
            ? items.length - 1
            : items.findIndex((task) => task.id === over.id)

        if (oldIndex < 0 || overIndex < 0 || oldIndex === overIndex) return prev

        return {
          ...prev,
          [activeContainer]: arrayMove(items, oldIndex, overIndex),
        }
      })
      return
    }

    setBoard((prev) => {
      const sourceItems = prev[activeContainer]
      const targetItems = prev[overContainer]
      const sourceIndex = sourceItems.findIndex((task) => task.id === active.id)
      if (sourceIndex < 0) return prev

      const destinationIndex =
        over.id === overContainer
          ? targetItems.length
          : targetItems.findIndex((task) => task.id === over.id)

      const movingTask = sourceItems[sourceIndex]
      const nextSource = [...sourceItems]
      nextSource.splice(sourceIndex, 1)

      const nextTarget = [...targetItems]
      const insertIndex = destinationIndex < 0 ? nextTarget.length : destinationIndex
      nextTarget.splice(insertIndex, 0, movingTask)

      return {
        ...prev,
        [activeContainer]: nextSource,
        [overContainer]: nextTarget,
      }
    })
  }

  function handleDragStart(event) {
    setActiveTaskId(event.active.id)
  }

  function handleDragCancel() {
    setActiveTaskId(null)
  }

  return {
    board,
    filteredBoard,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    isDarkMode,
    setIsDarkMode,
    modalMode,
    form,
    titleError,
    activeTask,
    sensors,
    openAddModal,
    openEditModal,
    handleFormChange,
    handleSubmit,
    handleDelete,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
    resetModalState,
  }
}

export default useKanbanBoard;
