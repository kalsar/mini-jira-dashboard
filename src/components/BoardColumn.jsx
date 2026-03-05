import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import styles from '../App.module.css'
import ColumnDropZone from './ColumnDropZone'
import TaskCard from './TaskCard'
// import TaskModal from './TaskModal'

function BoardColumn({ column, allCount, visibleItems, onOpenTask }) {




  
  return (
    <div id={column.id} className={styles.column}>
      <header className={styles.columnHeader}>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
          {column.title}
        </h2>
        <span className={styles.countBadge}>
          {visibleItems.length}
          {visibleItems.length !== allCount ? `/${allCount}` : ''}
        </span>
      </header>

      <SortableContext
        items={visibleItems.map((task) => task.id)}
        strategy={rectSortingStrategy}
      >
        <ColumnDropZone id={column.id}>
          {visibleItems.length ? (
            visibleItems.map((task) => (
              <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
            ))
          ) : (
            <p className="rounded-md border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
              No tasks
            </p>
          )}
        </ColumnDropZone>

          {/* <ColumnDropZone>
          {visibleItems.length ? (
            visibleItems.map((task) => (
              <TaskCard key={task.id} task={task} onOpen={onOpenTask} />
            ))
          ) : (
            <p className="rounded-md border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
              No tasks
            </p>
          )}
        </ColumnDropZone> */}
      </SortableContext>
    </div>
  )
}

export default BoardColumn
