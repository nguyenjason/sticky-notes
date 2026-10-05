# Sticky Notes

## Getting started

```bash
npm install
npm run dev
```

Open the printed localhost URL in a browser.

## Features

The assignment requires at least three of the four core features; three are implemented.

### Required

- Create a new note of the specified size at the specified position. ✅
- Change note size by dragging.
- Move a note by dragging. ✅
- Remove a note by dragging it over a predefined "trash" zone. ✅

### Optional

The optional features are bonuses; one is implemented.

- Entering/editing note text.
- Moving notes to front (in case of overlapping notes). ✅
- Saving notes to local storage (restoring them on page load).
- Different note colors.
- Saving notes to REST API. Note: you're not required to implement the API, you can mock it, but the mocks should be asynchronous.

## Architecture

State is split by intent: the `StickyNoteBoard` owns the list of notes, and each `StickyNote` owns its drag state while a drag is in progress, as a discriminated union (`idle` or `moving`). During a drag, the Sticky Note updates its own position based on how far the pointer has moved and re-renders itself.

The `StickyNoteBoard` re-renders when the Sticky Note is pressed to be brought to front, when it enters or leaves the trash zone, and when the drag ends. Each of those re-renders also re-renders the other Sticky Notes, which is acceptable for a first pass at small note counts; we would optimize with memoization if needed.

All mutations (create, bring to front, delete, and position updates) are handlers on `useStickyNoteBoard`, the single hook that owns the notes state and passes it to one `StickyNoteBoard` component.

The board organizes stacking with two stacking contexts: one for the notes and one for the controls. Each note's `zIndex` derives from its position in the notes array, so bringing a note to the front is a reorder.

## Known limitations

If the mocked REST API (Saving notes to REST API) were implemented, the app would keep the notes list in one shared array and each mutation would reload it. Two problems would show up.

### Reloading the whole list

Every mutation would refetch and replace the entire list, so the `StickyNote`s would briefly re-render their old positions after each action until the request finished. One option is to not reload the top level at all: mutations resolve their own responses into the list, and reloading becomes an explicit action instead of part of every write.

### Racing mutations

Rapid actions (clicking create repeatedly, or committing several drags in quick succession) would fire overlapping requests and reloads that resolve out of order, so notes could appear late or in a different order than the user made them. Not reloading the top level removes the racing reloads: each mutation resolves its own response. What is left to handle is a failed mutation, which needs a rollback so the list matches the server again.
