import { useState } from 'react';
import type { Note } from '../types/Note';

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

type Notes = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
};

export const useNotes = (): Notes => {
  const [notes, setNotes] = useState<Note[]>(mockedNotes);

  return { notes, setNotes: (notes: Note[]) => setNotes(notes) };
};
