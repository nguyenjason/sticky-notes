import { useState } from 'react';
import type { Note } from '../../types/Note';
import { StickyNote } from './packages/StickyNote/StickyNote';

const noteSize: Pick<Note, 'width' | 'height'> = { width: 160, height: 160 };

const mockedNotes: Note[] = [
  {
    id: 'a',
    positionX: 40,
    positionY: 40,
    width: noteSize.width,
    height: noteSize.height,
  },
  {
    id: 'b',
    positionX: 260,
    positionY: 120,
    width: noteSize.width,
    height: noteSize.height,
  },
];

export const StickyNoteBoard = () => {
  const [notes, setNotes] = useState<Note[]>(mockedNotes);

  const onStickyNoteDragEnd = (
    id: string,
    positionX: number,
    positionY: number,
  ) => {
    setNotes(
      notes.map((note) =>
        note.id === id
          ? {
              id: note.id,
              positionX,
              positionY,
              width: note.width,
              height: note.height,
            }
          : note,
      ),
    );
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          onDragEnd={(positionX, positionY) =>
            onStickyNoteDragEnd(note.id, positionX, positionY)
          }
        />
      ))}
    </div>
  );
};
