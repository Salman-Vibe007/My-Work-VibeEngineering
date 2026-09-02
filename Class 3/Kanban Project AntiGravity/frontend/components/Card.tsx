import { Trash2 } from 'lucide-react';
import { Card as CardType } from '@/types';

interface CardProps {
  card: CardType;
  onDelete: (cardId: string) => void;
}

export default function Card({ card, onDelete }: CardProps) {
  const handleDelete = () => {
    if (window.confirm(`Delete card "${card.title}"?`)) {
      onDelete(card.id);
    }
  };

  return (
    <article
      className="bg-white rounded-lg shadow-sm p-4 mb-3 border border-gray-200 hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
      role="article"
      aria-label={`Card: ${card.title}`}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
            {card.title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">{card.details}</p>
        </div>
        <button
          onClick={handleDelete}
          className="flex-shrink-0 text-gray-400 hover:text-red-600 transition-colors p-1"
          aria-label={`Delete card ${card.title}`}
          type="button"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
