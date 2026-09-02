'use client';

import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Column from './Column';
import { Board as BoardType, Column as ColumnType, Card as CardType } from '@/types';

interface BoardProps {
  board: BoardType;
  setBoard: (board: BoardType) => void;
}

function generateId(): string {
  return `card-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function Board({ board, setBoard }: BoardProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const newBoard = JSON.parse(JSON.stringify(board)) as BoardType;

    // Find source column and card
    let sourceColumn: ColumnType | undefined;
    let sourceCardIndex = -1;
    let card: CardType | undefined;

    for (const col of newBoard.columns) {
      const cardIdx = col.cards.findIndex((c) => c.id === activeId);
      if (cardIdx !== -1) {
        sourceColumn = col;
        sourceCardIndex = cardIdx;
        card = col.cards[cardIdx];
        break;
      }
    }

    if (!sourceColumn || !card) return;

    // Find target (could be a column or another card's column)
    let targetColumn: ColumnType | undefined;
    let targetCardIndex = -1;

    // First check if overId is a column
    targetColumn = newBoard.columns.find((col) => col.id === overId);

    // If not, find the column containing the card
    if (!targetColumn) {
      for (const col of newBoard.columns) {
        const cardIdx = col.cards.findIndex((c) => c.id === overId);
        if (cardIdx !== -1) {
          targetColumn = col;
          targetCardIndex = cardIdx;
          break;
        }
      }
    }

    if (!targetColumn) return;

    // Remove card from source
    sourceColumn.cards.splice(sourceCardIndex, 1);

    // Add card to target
    if (targetCardIndex === -1) {
      targetColumn.cards.push(card);
    } else {
      targetColumn.cards.splice(targetCardIndex, 0, card);
    }

    setBoard(newBoard);
  };

  const handleAddCard = (columnId: string, title: string, details: string) => {
    const newBoard = JSON.parse(JSON.stringify(board)) as BoardType;
    const column = newBoard.columns.find((col) => col.id === columnId);
    if (column) {
      column.cards.push({
        id: generateId(),
        title,
        details,
      });
      setBoard(newBoard);
    }
  };

  const handleDeleteCard = (columnId: string, cardId: string) => {
    const newBoard = JSON.parse(JSON.stringify(board)) as BoardType;
    const column = newBoard.columns.find((col) => col.id === columnId);
    if (column) {
      column.cards = column.cards.filter((card) => card.id !== cardId);
      setBoard(newBoard);
    }
  };

  const handleRenameColumn = (columnId: string, newTitle: string) => {
    const newBoard = JSON.parse(JSON.stringify(board)) as BoardType;
    const column = newBoard.columns.find((col) => col.id === columnId);
    if (column) {
      column.title = newTitle;
      setBoard(newBoard);
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div
        className="flex gap-6 overflow-x-auto pb-4"
        role="main"
        aria-label="Kanban board columns"
      >
        {board.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            onAddCard={handleAddCard}
            onDeleteCard={handleDeleteCard}
            onRenameColumn={handleRenameColumn}
          />
        ))}
      </div>
    </DndContext>
  );
}
