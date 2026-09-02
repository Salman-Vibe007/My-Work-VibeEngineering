import { Edit2, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Column as ColumnType } from '@/types';

interface ColumnHeaderProps {
  column: ColumnType;
  onRename: (columnId: string, newTitle: string) => void;
}

export default function ColumnHeader({ column, onRename }: ColumnHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(column.title);

  const handleSave = () => {
    if (newTitle.trim() && newTitle !== column.title) {
      onRename(column.id, newTitle);
    } else {
      setNewTitle(column.title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewTitle(column.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-3 py-2 border-2 border-brand-yellow rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue font-bold text-gray-800"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="text-brand-purple hover:text-opacity-70 transition-colors p-1"
          type="button"
          aria-label="Save column name"
        >
          <Check size={18} />
        </button>
        <button
          onClick={handleCancel}
          className="text-gray-400 hover:text-red-600 transition-colors p-1"
          type="button"
          aria-label="Cancel editing"
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-brand-yellow">
      <h2 className="text-lg font-bold text-brand-navy">{column.title}</h2>
      <button
        onClick={() => setIsEditing(true)}
        className="text-gray-400 hover:text-brand-blue transition-colors p-1"
        type="button"
        aria-label={`Edit column name ${column.title}`}
      >
        <Edit2 size={16} />
      </button>
    </div>
  );
}
