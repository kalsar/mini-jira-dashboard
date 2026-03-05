import { useDroppable } from '@dnd-kit/core'
import styles from '../App.module.css'
import { useRef } from 'react'

function ColumnDropZone({ id, children }) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={styles.columnBody}>
      {children}
    </div>
  )
}

export default ColumnDropZone;
