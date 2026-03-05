

import { COLUMNS, PRIORITY_OPTIONS } from "../constants/board";
import styles from "../App.module.css";

function TaskModal(props) {
  const { mode, form, onChange, onClose, onSubmit, onDelete, titleError } =
    props;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          {mode === "edit" ? "Edit Task" : "Add Task"}
        </h2>

        <form onSubmit={onSubmit} className="mt-4 space-y-4">
          {/* Title */}
          <label className={styles.field}>
            <span>Title *</span>
            <input
              className={styles.input}
              name="title"
              value={form.title}
              onChange={onChange}
              placeholder="Task title"
            />
            {titleError && <p className={styles.errorText}>{titleError}</p>}
          </label>

          {/* Description */}
          <label className={styles.field}>
            <span>Description</span>
            <textarea
              className={styles.input}
              name="description"
              value={form.description}
              onChange={onChange}
              placeholder="Describe the task"
              rows="4"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Priority */}
            <label className={styles.field}>
              <span>Priority</span>
              <select
                className={styles.input}
                name="priority"
                value={form.priority}
                onChange={onChange}
              >
                {PRIORITY_OPTIONS.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            {/* Assignee */}
            <label className={styles.field}>
              <span>Assignee</span>
              <input
                className={styles.input}
                name="assignee"
                value={form.assignee}
                onChange={onChange}
                placeholder="Assignee name"
              />
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Due Date */}
            <label className={styles.field}>
              <span>Due Date</span>
              <input
                type="date"
                className={styles.input}
                name="dueDate"
                value={form.dueDate}
                onChange={onChange}
              />
            </label>

            {/* Status only in edit */}
            {mode === "edit" && (
              <label className={styles.field}>
                <span>Status</span>
                <select
                  className={styles.input}
                  name="status"
                  value={form.status}
                  onChange={onChange}
                >
                  {COLUMNS.map((col) => (
                    <option key={col.id} value={col.id}>
                      {col.title}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {mode === "edit" && (
              <button
                type="button"
                onClick={onDelete}
                className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100"
              >
                Delete
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
