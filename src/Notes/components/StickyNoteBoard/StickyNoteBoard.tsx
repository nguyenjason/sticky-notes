import { useStickyNoteBoard } from '../../hooks/useStickyNoteBoard';
import { StickyNote } from './packages/StickyNote/StickyNote';
import { TrashZone } from './packages/TrashZone/TrashZone';

export const StickyNoteBoard = () => {
  const {
    notes,
    isTrashTargeted,
    boardRef,
    trashRef,
    onStickyNoteDrag,
    onStickyNoteDragEnd,
  } = useStickyNoteBoard();

  return (
    <div
      ref={boardRef}
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          onDrag={(positionX, positionY) =>
            onStickyNoteDrag(note, positionX, positionY)
          }
          onDragEnd={(positionX, positionY) =>
            onStickyNoteDragEnd(note, positionX, positionY)
          }
        />
      ))}
      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
        <TrashZone isTargeted={isTrashTargeted} trashRef={trashRef} />
      </div>
    </div>
  );
};
