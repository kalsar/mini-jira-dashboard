import { COLUMNS } from '../constants/board'

export function cloneBoard(board) {
  return {
    todo: [...board.todo],
    inProgress: [...board.inProgress],
    done: [...board.done],
  }
}

export function findColumnIdByTaskId(taskId, sourceBoard) {
  return COLUMNS.find((column) =>
    sourceBoard[column.id].some((task) => task.id === taskId),
  )?.id
}

export function getPriorityClass(priority, styles) {
  if (priority === 'Low') return styles.lowPriority
  if (priority === 'High') return styles.highPriority
  return styles.mediumPriority
}

export function filterBoard(board, searchQuery, priorityFilter) {
  const normalizedQuery = searchQuery.trim().toLowerCase()
  const matchesTask = (task) => {
    const matchesTitle = task.title.toLowerCase().includes(normalizedQuery)
    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter
    return matchesTitle && matchesPriority
  }

  return {
    todo: board.todo.filter(matchesTask),
    inProgress: board.inProgress.filter(matchesTask),
    done: board.done.filter(matchesTask),
  }
}
