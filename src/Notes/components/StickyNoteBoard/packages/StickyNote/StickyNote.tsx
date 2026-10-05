import { useState } from 'react';
import type { PointerEvent } from 'react';
import type { Note } from '../../../../types/Note';

type DragState =
  | { type: 'idle' }
  | {
      type: 'moving';
      positionX: number;
      positionY: number;
      startX: number;
      startY: number;
    };

type StickyNoteProps = {
  note: Note;
  onDragEnd: (positionX: number, positionY: number) => void;
};

export const StickyNote = ({ note, onDragEnd }: StickyNoteProps) => {
  const [drag, setDrag] = useState<DragState>({ type: 'idle' });

  const positionX = drag.type === 'moving' ? drag.positionX : note.positionX;
  const positionY = drag.type === 'moving' ? drag.positionY : note.positionY;

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.type !== 'idle') {
      return;
    }

    // Retargets the pointer event to this note until release
    // without it fast drags leave the element and handlePointerMove stops firing.
    event.currentTarget.setPointerCapture(event.pointerId);

    setDrag({
      type: 'moving',
      positionX: note.positionX,
      positionY: note.positionY,
      startX: event.clientX,
      startY: event.clientY,
    });
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (drag.type !== 'moving') {
      return;
    }

    const nextPositionX = drag.positionX + event.clientX - drag.startX;
    const nextPositionY = drag.positionY + event.clientY - drag.startY;

    setDrag({
      type: 'moving',
      positionX: nextPositionX,
      positionY: nextPositionY,
      startX: event.clientX,
      startY: event.clientY,
    });
  };

  const handlePointerUp = () => {
    if (drag.type !== 'moving') {
      return;
    }

    setDrag({ type: 'idle' });

    onDragEnd(drag.positionX, drag.positionY);
  };

  return (
    <div
      style={{
        position: 'absolute',
        background: '#fef08a',
        borderRadius: '0.25rem',
        boxShadow: '0 0.125rem 0.375rem rgb(0 0 0 / 20%)',
        left: `${positionX}px`,
        top: `${positionY}px`,
        width: `${note.width}px`,
        height: `${note.height}px`,
        cursor: drag.type === 'moving' ? 'grabbing' : 'grab',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
};
