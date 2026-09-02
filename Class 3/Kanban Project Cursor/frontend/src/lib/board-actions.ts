import type { BoardAction, BoardState } from "./types";

let cardIdCounter = 100;

export function generateCardId(): string {
  cardIdCounter += 1;
  return `card-${cardIdCounter}`;
}

export function renameColumn(
  state: BoardState,
  columnId: string,
  title: string,
): BoardState {
  const trimmed = title.trim();
  if (!trimmed) return state;

  return {
    ...state,
    columns: state.columns.map((col) =>
      col.id === columnId ? { ...col, title: trimmed } : col,
    ),
  };
}

export function addCard(
  state: BoardState,
  columnId: string,
  title: string,
  details: string,
): BoardState {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) return state;

  const id = generateCardId();
  const newCard = {
    id,
    title: trimmedTitle,
    details: details.trim(),
  };

  return {
    ...state,
    cards: { ...state.cards, [id]: newCard },
    columns: state.columns.map((col) =>
      col.id === columnId ? { ...col, cardIds: [...col.cardIds, id] } : col,
    ),
  };
}

export function deleteCard(state: BoardState, cardId: string): BoardState {
  if (!state.cards[cardId]) return state;

  const { [cardId]: _removed, ...remainingCards } = state.cards;

  return {
    cards: remainingCards,
    columns: state.columns.map((col) => ({
      ...col,
      cardIds: col.cardIds.filter((id) => id !== cardId),
    })),
  };
}

export function moveCard(
  state: BoardState,
  activeId: string,
  overColumnId: string,
  overIndex: number,
): BoardState {
  const sourceColumn = state.columns.find((col) =>
    col.cardIds.includes(activeId),
  );
  if (!sourceColumn) return state;

  const targetColumn = state.columns.find((col) => col.id === overColumnId);
  if (!targetColumn) return state;

  const sourceIndex = sourceColumn.cardIds.indexOf(activeId);
  if (sourceIndex === -1) return state;

  const newColumns = state.columns.map((col) => ({
    ...col,
    cardIds: [...col.cardIds],
  }));

  const sourceCol = newColumns.find((col) => col.id === sourceColumn.id)!;
  const targetCol = newColumns.find((col) => col.id === overColumnId)!;

  sourceCol.cardIds.splice(sourceIndex, 1);

  let insertIndex = overIndex;
  if (sourceColumn.id === overColumnId && sourceIndex < overIndex) {
    insertIndex = overIndex - 1;
  }
  insertIndex = Math.max(0, Math.min(insertIndex, targetCol.cardIds.length));

  targetCol.cardIds.splice(insertIndex, 0, activeId);

  return { ...state, columns: newColumns };
}

export function boardReducer(
  state: BoardState,
  action: BoardAction,
): BoardState {
  switch (action.type) {
    case "RENAME_COLUMN":
      return renameColumn(state, action.columnId, action.title);
    case "ADD_CARD":
      return addCard(state, action.columnId, action.title, action.details);
    case "DELETE_CARD":
      return deleteCard(state, action.cardId);
    case "MOVE_CARD":
      return moveCard(
        state,
        action.activeId,
        action.overColumnId,
        action.overIndex,
      );
    default:
      return state;
  }
}
