export const noteSize: Pick<Note, 'width' | 'height'> = {
  width: 160,
  height: 160,
};

export type Note = {
  id: string;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
};
