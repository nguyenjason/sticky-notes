type StickyNoteCreateButtonProps = {
  onCreate: () => void;
};

export const StickyNoteCreateButton = ({
  onCreate,
}: StickyNoteCreateButtonProps) => {
  return (
    <button
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid rgb(0 0 0 / 15%)',
        borderRadius: '0.25rem',
        boxShadow: '0 0.125rem 0.375rem rgb(0 0 0 / 20%)',
        background: '#000000',
        color: '#ffffff',
        cursor: 'pointer',
      }}
      onClick={onCreate}
    >
      Create new note
    </button>
  );
};
