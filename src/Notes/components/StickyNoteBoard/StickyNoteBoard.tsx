import { useStickyNoteBoard } from '../../hooks/useStickyNoteBoard';
import { StickyNote } from './packages/StickyNote/StickyNote';
import { StickyNoteCreateButton } from './packages/StickyNoteCreateButton/StickyNoteCreateButton';
import { TrashZone } from './packages/TrashZone/TrashZone';

export const StickyNoteBoard = () => {
  const {
    notes,
    isTrashTargeted,
    boardRef,
    trashRef,
    onStickyNoteCreate,
    onStickyNoteDragStart,
    onStickyNoteDrag,
    onStickyNoteDragEnd,
  } = useStickyNoteBoard();

  return (
    <div
      ref={boardRef}
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      <div style={{ position: 'absolute', zIndex: 2 }}>
        {notes.map((note, index) => (
          <StickyNote
            key={note.id}
            note={note}
            zIndex={index + 1}
            onDragStart={() => onStickyNoteDragStart(note)}
            onDrag={(positionX, positionY) =>
              onStickyNoteDrag(note, positionX, positionY)
            }
            onDragEnd={(positionX, positionY) =>
              onStickyNoteDragEnd(note, positionX, positionY)
            }
          />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 3,
        }}
      >
        <StickyNoteCreateButton onCreate={onStickyNoteCreate} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
          }}
        >
          <TrashZone isTargeted={isTrashTargeted} trashRef={trashRef} />
        </div>
      </div>
    </div>
  );
};
