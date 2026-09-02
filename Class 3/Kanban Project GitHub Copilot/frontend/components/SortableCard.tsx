import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Card from './Card';
import { Card as CardType } from '@/types';

interface SortableCardProps {
  card: CardType;
  onDelete: (cardId: string) => void;
}

export function SortableCard({ card, onDelete }: SortableCardProps) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={isDragging ? 'rounded-lg ring-2 ring-brand-yellow scale-95' : ''}
    >
      <Card card={card} onDelete={onDelete} />
    </div>
  );
}
