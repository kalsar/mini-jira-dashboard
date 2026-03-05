import { getPriorityClass } from '../utils/board'
import styles from '../App.module.css'

function TaskDragOverlayCard({ task }) {
  if (!task) return null

  return (
    <article className={`${styles.taskCard} shadow-lg`}>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          {task.title}
        </h3>
        <span className={`${styles.priorityBadge} ${getPriorityClass(task.priority, styles)}`}>
          {task.priority}
        </span>
      </div>

      {task.description ? (
        <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
          {task.description}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
        {task.assignee ? <span>@{task.assignee}</span> : <span>Unassigned</span>}
        {task.dueDate ? <span>Due {task.dueDate}</span> : null}
      </div>
    </article>
  )
}

export default TaskDragOverlayCard
