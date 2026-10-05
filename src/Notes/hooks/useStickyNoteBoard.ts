import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { Note } from '../types/Note';
import { useNotes } from './useNotes';

type StickyNoteBoard = {
  notes: Note[];
  isTrashTargeted: boolean;
  boardRef: RefObject<HTMLDivElement | null>;
  trashRef: RefObject<HTMLDivElement | null>;
  onStickyNoteDrag: (
    draggedNote: Note,
    positionX: number,
    positionY: number,
  ) => void;
  onStickyNoteDragEnd: (
    draggedNote: Note,
    positionX: number,
    positionY: number,
  ) => void;
};

export const useStickyNoteBoard = (): StickyNoteBoard => {
  const { notes, setNotes } = useNotes();
  const [isTrashTargeted, setIsTrashTargeted] = useState(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const trashRef = useRef<HTMLDivElement>(null);

  const isNoteTouchingTrash = (
    note: Note,
    positionX: number,
    positionY: number,
  ) => {
    const board = boardRef.current;
    const trash = trashRef.current;
    if (!board || !trash) {
      return false;
    }

    const boardRect = board.getBoundingClientRect();
    const trashRect = trash.getBoundingClientRect();

    const noteLeft = boardRect.left + positionX;
    const noteTop = boardRect.top + positionY;

    const isSeparatedHorizontally =
      noteLeft > trashRect.right || noteLeft + note.width < trashRect.left;
    const isSeparatedVertically =
      noteTop > trashRect.bottom || noteTop + note.height < trashRect.top;

    return !isSeparatedHorizontally && !isSeparatedVertically;
  };

  const onStickyNoteDrag = (
    draggedNote: Note,
    positionX: number,
    positionY: number,
  ) => {
    const targeted = isNoteTouchingTrash(draggedNote, positionX, positionY);

    if (targeted !== isTrashTargeted) {
      setIsTrashTargeted(targeted);
    }
  };

  const onStickyNoteDragEnd = (
    draggedNote: Note,
    positionX: number,
    positionY: number,
  ) => {
    if (isTrashTargeted) {
      setNotes(notes.filter((note) => note.id !== draggedNote.id));
      setIsTrashTargeted(false);
      return;
    }

    setNotes(
      notes.map((note) =>
        note.id === draggedNote.id
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

  return {
    notes,
    isTrashTargeted,
    boardRef,
    trashRef,
    onStickyNoteDrag,
    onStickyNoteDragEnd,
  };
};
