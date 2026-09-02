"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "@/lib/types";
import { KanbanCardContent } from "./KanbanCardContent";

type KanbanCardProps = {
  card: Card;
  onDelete: (cardId: string) => void;
};

export function KanbanCard({ card, onDelete }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <KanbanCardContent
        card={card}
        onDelete={onDelete}
        className={`transition-shadow ${
          isDragging
            ? "border-accent-yellow opacity-40 shadow-lg"
            : "hover:shadow-md"
        }`}
      />
    </div>
  );
}
