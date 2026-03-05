import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import styles from "./App.module.css";
// import Board from "./components";
import BoardColumn from "./components/BoardColumn";
import TaskDragOverlayCard from "./components/TaskDragOverlayCard";
import BoardToolbar from "./components/BoardToolbar";
import TaskModal from "./components/TaskModal";
import { COLUMNS } from "./constants/board";
import useKanbanBoard from "./hooks/useKanbanBoard";

function App() {
  const {
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
  } = useKanbanBoard();

  return (
    <main
      className={`${styles.page} ${isDarkMode ? "dark" : ""} bg-[#ffffff] text-slate-900 dark:bg-slate-950 dark:text-slate-100`}
    >
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <BoardToolbar
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          onAddTask={openAddModal}
          searchQuery={searchQuery}
          onSearchChange={(event) => setSearchQuery(event.target.value)}
          priorityFilter={priorityFilter}
          onPriorityFilterChange={(event) =>
            setPriorityFilter(event.target.value)
          }
        />

        {/* dragable card */}

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragCancel={handleDragCancel}
          onDragEnd={handleDragEnd}
        >
          <section className="grid gap-4 md:grid-cols-3">
            {COLUMNS.map((column) => {
              const allCount = board[column.id].length;
              const visibleItems = filteredBoard[column.id];

              return (
                <BoardColumn
                  key={column.id}
                  column={column}
                  allCount={allCount}
                  visibleItems={visibleItems}
                  onOpenTask={openEditModal}
                />
              );
            })}
          </section>
          <DragOverlay>
            <TaskDragOverlayCard task={activeTask} />
          </DragOverlay>
        </DndContext>
      </div>

      {/* open modal  */}

      {modalMode ? (
        <TaskModal
          mode={modalMode}
          form={form}
          onChange={handleFormChange}
          onClose={resetModalState}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
          titleError={titleError}
        />
      ) : null}
    </main>
  );
}

export default App;
