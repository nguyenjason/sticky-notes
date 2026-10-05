import type { RefObject } from 'react';

type TrashZoneProps = {
  isTargeted: boolean;
  trashRef: RefObject<HTMLDivElement | null>;
};

export const TrashZone = ({ isTargeted, trashRef }: TrashZoneProps) => {
  return (
    <div
      ref={trashRef}
      style={{
        width: '6rem',
        height: '6rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: `2px dashed ${isTargeted ? '#dc2626' : 'rgb(0 0 0 / 25%)'}`,
        borderRadius: '0.5rem',
        background: isTargeted ? 'rgb(220 38 38 / 10%)' : 'rgb(0 0 0 / 5%)',
        color: isTargeted ? '#dc2626' : 'rgb(0 0 0 / 45%)',
        pointerEvents: 'none',
      }}
    >
      Trash
    </div>
  );
};
