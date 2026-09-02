"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { BoardState } from "@/lib/types";
import { EditableColumnTitle } from "./EditableColumnTitle";
import { KanbanCard } from "./KanbanCard";
import { AddCardForm } from "./AddCardForm";

type ColumnProps = {
  column: BoardState["columns"][number];
  cards: BoardState["cards"];
  onRename: (columnId: string, title: string) => void;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (cardId: string) => void;
};

export function Column({
  column,
  cards,
  onRename,
  onAddCard,
  onDeleteCard,
}: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div
      data-testid={`column-${column.id}`}
      className="flex w-72 shrink-0 flex-col rounded-xl bg-gray-50/80"
    >
      <div className="border-t-4 border-accent-yellow rounded-t-xl px-3 pt-3">
        <EditableColumnTitle
          title={column.title}
          onSave={(title) => onRename(column.id, title)}
        />
        <p className="mt-0.5 text-xs text-gray-text">
          {column.cardIds.length} card{column.cardIds.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div
        ref={setNodeRef}
        className={`flex min-h-[120px] flex-1 flex-col gap-2 px-3 py-2 transition-colors ${
          isOver ? "bg-blue-primary/5 rounded-lg" : ""
        }`}
      >
        <SortableContext
          items={column.cardIds}
          strategy={verticalListSortingStrategy}
        >
          {column.cardIds.length === 0 ? (
            <p className="py-4 text-center text-xs text-gray-text">
              Drop cards here
            </p>
          ) : (
            column.cardIds.map((cardId) => {
              const card = cards[cardId];
              if (!card) return null;
              return (
                <KanbanCard
                  key={card.id}
                  card={card}
                  onDelete={onDeleteCard}
                />
              );
            })
          )}
        </SortableContext>
      </div>

      <div className="px-3 pb-3">
        <AddCardForm columnId={column.id} onAdd={onAddCard} />
      </div>
    </div>
  );
}
