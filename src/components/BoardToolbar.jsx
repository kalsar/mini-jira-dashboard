import { PRIORITY_OPTIONS } from '../constants/board'
import styles from '../App.module.css'

function BoardToolbar({
  isDarkMode,
  onToggleDarkMode,
  onAddTask,
  searchQuery,
  onSearchChange,
  priorityFilter,
  onPriorityFilterChange,
}) {

  // this is header component 


return (
    <>
      <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Task Management Dashboard</h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Manage your tasks here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium transition hover:bg-slate-100 dark:border-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button
            type="button"
            onClick={onAddTask}
            className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            Add Task
          </button>
        </div>
      </header>

      <section className="mb-6 grid gap-3 md:grid-cols-[2fr_1fr]">
        <input
          className={styles.toolbarInput}
          type="text"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search by task title"
        />
        <select
          className={styles.toolbarInput}
          value={priorityFilter}
          onChange={onPriorityFilterChange}
        >
          <option value="All">All Priorities</option>
          {PRIORITY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </section>
    </>
  )
}

export default BoardToolbar
