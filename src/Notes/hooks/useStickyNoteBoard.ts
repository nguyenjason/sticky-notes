import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { Note } from '../types/Note';
import { noteSize } from '../types/Note';

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

type StickyNoteBoard = {
  notes: Note[];
  isTrashTargeted: boolean;
  boardRef: RefObject<HTMLDivElement | null>;
  trashRef: RefObject<HTMLDivElement | null>;
  onStickyNoteCreate: () => void;
  onStickyNoteDragStart: (draggedNote: Note) => void;
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

const spawnPosition = 40;
const spawnOffset = 24;

export const useStickyNoteBoard = (): StickyNoteBoard => {
  const [notes, setNotes] = useState<Note[]>(mockedNotes);
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

  const onStickyNoteCreate = () => {
    const offset = (notes.length % 6) * spawnOffset;

    setNotes(
      notes.concat({
        id: crypto.randomUUID(),
        positionX: spawnPosition + offset,
        positionY: spawnPosition + offset,
        width: noteSize.width,
        height: noteSize.height,
      }),
    );
  };

  const onStickyNoteDragStart = (draggedNote: Note) => {
    const frontNote = notes[notes.length - 1];
    if (frontNote?.id === draggedNote.id) {
      return;
    }

    setNotes(
      notes.filter((note) => note.id !== draggedNote.id).concat(draggedNote),
    );
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
    onStickyNoteCreate,
    onStickyNoteDragStart,
    onStickyNoteDrag,
    onStickyNoteDragEnd,
  };
};
