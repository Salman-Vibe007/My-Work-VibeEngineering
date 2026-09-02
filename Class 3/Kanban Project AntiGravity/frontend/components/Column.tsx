import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Card';
import ColumnHeader from './ColumnHeader';
import AddCardForm from './AddCardForm';
import { Column as ColumnType } from '@/types';
import { SortableCard } from './SortableCard';

interface ColumnProps {
  column: ColumnType;
  onAddCard: (columnId: string, title: string, details: string) => void;
  onDeleteCard: (columnId: string, cardId: string) => void;
  onRenameColumn: (columnId: string, newTitle: string) => void;
}

export default function Column({
  column,
  onAddCard,
  onDeleteCard,
  onRenameColumn,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const cardIds = column.cards.map((card) => card.id);

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 rounded-lg p-4 min-h-96 flex flex-col w-80 flex-shrink-0"
      role="region"
      aria-label={`Column: ${column.title}`}
      aria-describedby={`column-description-${column.id}`}
    >
      <ColumnHeader column={column} onRename={onRenameColumn} />

      <div className="flex-1 overflow-y-auto mb-4 pr-1">
        <SortableContext
          items={cardIds}
          strategy={verticalListSortingStrategy}
        >
          {column.cards.length > 0 ? (
            <div role="list">
              {column.cards.map((card) => (
                <div key={card.id} role="listitem">
                  <SortableCard
                    card={card}
                    onDelete={() => onDeleteCard(column.id, card.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center py-8">
              No cards yet
            </p>
          )}
        </SortableContext>
      </div>

      <AddCardForm
        onAdd={(title, details) => onAddCard(column.id, title, details)}
      />

      <div
        id={`column-description-${column.id}`}
        className="sr-only"
      >
        {column.cards.length} card{column.cards.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
