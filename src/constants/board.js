export const STORAGE_KEY = 'kanban-mini-jira-board'

export const COLUMNS = [
  { id: 'todo', title: 'Todo' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
]

export const PRIORITY_OPTIONS = ['Low', 'Medium', 'High']

export const SAMPLE_BOARD = {
  todo: [
    {
      id: crypto.randomUUID(),
      title: 'Set up project board',
      description: 'Define initial stories and acceptance criteria.',
      priority: 'Medium',
      assignee: 'Sana',
      dueDate: '',
    },
  ],
  inProgress: [
    {
      id: crypto.randomUUID(),
      title: 'Build task card component',
      description: 'Create card UI with priority badge and metadata.',
      priority: 'High',
      assignee: 'Ravi',
      dueDate: '',
    },
  ],
  done: [],
}

export const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  assignee: '',
  dueDate: '',
  status: 'todo',
}
