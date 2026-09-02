"use client";

import { useReducer } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { initialBoardState } from "@/lib/dummy-data";
import { boardReducer } from "@/lib/board-actions";
import type { Card } from "@/lib/types";
import { Column } from "./Column";
import { KanbanCardContent } from "./KanbanCardContent";
import { useState } from "react";

function findColumnId(
  columns: typeof initialBoardState.columns,
  cardId: string,
): string | undefined {
  return columns.find((col) => col.cardIds.includes(cardId))?.id;
}

export function Board() {
  const [state, dispatch] = useReducer(boardReducer, initialBoardState);
  const [activeCard, setActiveCard] = useState<Card | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = (event: DragStartEvent) => {
    const card = state.cards[event.active.id as string];
    if (card) setActiveCard(card);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveCard(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumnId = findColumnId(state.columns, activeId);
    if (!sourceColumnId) return;

    let overColumnId = overId;
    let overIndex = 0;

    const overColumn = state.columns.find((col) => col.id === overId);
    if (overColumn) {
      overColumnId = overColumn.id;
      overIndex = overColumn.cardIds.length;
    } else {
      const targetColumn = state.columns.find((col) =>
        col.cardIds.includes(overId),
      );
      if (targetColumn) {
        overColumnId = targetColumn.id;
        overIndex = targetColumn.cardIds.indexOf(overId);
      } else {
        return;
      }
    }

    dispatch({
      type: "MOVE_CARD",
      activeId,
      overColumnId,
      overIndex,
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="shrink-0 border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-2xl font-bold text-navy">Project Board</h1>
        <p className="mt-1 text-sm text-gray-text">
          Drag cards between columns to track progress
        </p>
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-x-auto p-6">
          <div className="flex gap-4" data-testid="board-columns">
            {state.columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                cards={state.cards}
                onRename={(columnId, title) =>
                  dispatch({ type: "RENAME_COLUMN", columnId, title })
                }
                onAddCard={(columnId, title, details) =>
                  dispatch({ type: "ADD_CARD", columnId, title, details })
                }
                onDeleteCard={(cardId) =>
                  dispatch({ type: "DELETE_CARD", cardId })
                }
              />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeCard ? (
            <div className="rotate-2 scale-105 opacity-95">
              <KanbanCardContent
                card={activeCard}
                showDelete={false}
                className="border-accent-yellow shadow-lg"
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
